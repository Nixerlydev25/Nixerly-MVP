import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import PortfolioService from "@/services/worker/portfolio.service";
import type {
  Portfolio,
  CreatePortfolioPayload,
  SavePortfolioAssetsPayload,
} from "@/types/worker.types";
import { QueryKeys } from "@/querykey";

interface CreatePortfoliosVariables {
  portfolios: CreatePortfolioPayload[];
  selectedFiles: { [key: number]: File[] };
}

interface CreatePortfoliosResponse {
  message: string;
  portfolios: Portfolio[];
}

export const usePortfolios = () => {
  const queryClient = useQueryClient();

  const uploadPortfolioAssetsMutation = useMutation({
    mutationFn: async ({
      files,
      portfolioId,
      portfolioIndex,
      progressSetter,
    }: {
      files: File[];
      portfolioId: string;
      portfolioIndex: number;
      progressSetter?: (portfolioIndex: number, fileName: string, percent: number) => void;
    }) => {
      if (!files || !files.length) {
        console.log("No files to upload for portfolio:", portfolioId);
        return;
      }

      // Filter out empty file objects
      const validFiles = files.filter((file) => file && file.size > 0 && file.name);

      if (!validFiles.length) {
        console.log("No valid files to upload for portfolio:", portfolioId);
        return;
      }

      console.log("Uploading files for portfolio:", portfolioId, validFiles);

      // Get presigned URLs for all files
      const response = await PortfolioService.getAssetUploadUrl({
        portfolioId,
        files: validFiles.map((file) => ({
          fileName: file.name,
          contentType: file.type,
        })),
      });

      console.log("Got presigned URLs:", response);

      // Upload all files to S3
      await Promise.all(
        response.urls.map((urlData) => {
          const file = validFiles.find((f) => f.name === urlData.fileName)!;
          return PortfolioService.uploadAsset(
            urlData.presignedUrl,
            file,
            file.type,
            progressSetter
              ? (percent) => progressSetter(portfolioIndex, file.name, percent)
              : undefined
          );
        })
      );

      // Save the assets in the database
      const payload: SavePortfolioAssetsPayload = {
        portfolioId,
        assets: response.urls.map((urlData) => ({
          s3Key: urlData.s3Key,
          mediaType: validFiles.find((f) => f.name === urlData.fileName)!.type,
        })),
      };

      return PortfolioService.saveAssets(payload);
    },
  });

  const createPortfoliosMutation = useMutation<
    CreatePortfoliosResponse,
    Error,
    CreatePortfoliosVariables & { progressSetter?: (portfolioIndex: number, fileName: string, percent: number) => void }
  >({
    // @ts-expect-error - TODO: fix this
    mutationFn: async ({ portfolios }) => {
      return PortfolioService.createPortfolios(portfolios);
    },
    onSuccess: async (response, variables) => {
      console.log("Portfolios created successfully:", response);
      console.log("variables", variables);
      const progressSetter = (variables as any).progressSetter;
      // Upload assets for each portfolio
      try {
        // Support multiple portfolios/files
        for (let i = 0; i < response.portfolios.length; i++) {
          const files = variables.selectedFiles[i] || [];
          if (files.length > 0) {
            const portfolio = response.portfolios[i];
            await uploadPortfolioAssetsMutation.mutateAsync({
              files,
              portfolioId: portfolio.id,
              portfolioIndex: i,
              progressSetter,
            });
            console.log(`Successfully uploaded assets for portfolio ${portfolio.id}`);
          }
        }
      } catch (error) {
        console.error("Error uploading portfolio assets:", error);
        toast.error("Failed to upload some portfolio images");
      }

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.WORKER_PROFILE_DETAILS],
      });
    },
  });

  const deletePortfoliosMutation = useMutation({
    mutationFn: async (portfolioIds: string[]) => {
      return PortfolioService.deletePortfolios(portfolioIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.WORKER_PROFILE_DETAILS],
      });
    },
  });

  return {
    createPortfolios: (
      portfolios: CreatePortfolioPayload[],
      selectedFiles: { [key: number]: File[] },
      progressSetter?: (portfolioIndex: number, fileName: string, percent: number) => void
    ) =>
      createPortfoliosMutation.mutateAsync({ 
        portfolios, 
        selectedFiles,
        progressSetter,
      }),
    deletePortfolios: deletePortfoliosMutation.mutateAsync,
    isLoading:
      createPortfoliosMutation.isPending ||
      deletePortfoliosMutation.isPending ||
      uploadPortfolioAssetsMutation.isPending,
  };
};
 