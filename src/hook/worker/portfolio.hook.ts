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
    }: {
      files: File[];
      portfolioId: string;
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
        response.urls.map((urlData) =>
          PortfolioService.uploadAsset(
            urlData.presignedUrl,
            validFiles.find((f) => f.name === urlData.fileName)!,
            validFiles.find((f) => f.name === urlData.fileName)!.type
          )
        )
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
    CreatePortfoliosVariables
  >({
    // @ts-expect-error - TODO: fix this
    mutationFn: async ({ portfolios }) => {
      return PortfolioService.createPortfolios(portfolios);
    },
    onSuccess: async (response, variables) => {
      console.log("Portfolios created successfully:", response);
      console.log("variables", variables);
      
      // Upload assets for each portfolio
      try {
        // Since we're only using index 0 in the form
        const files = variables.selectedFiles[0] || [];
        console.log("Files to upload:", files);

        if (files.length > 0 && response.portfolios.length > 0) {
          // Upload files for the first portfolio
          const portfolio = response.portfolios[0];
          await uploadPortfolioAssetsMutation.mutateAsync({
            files,
            portfolioId: portfolio.id,
          });
          console.log(`Successfully uploaded assets for portfolio ${portfolio.id}`);
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
      selectedFiles: { [key: number]: File[] }
    ) =>
      createPortfoliosMutation.mutateAsync({ 
        portfolios, 
        selectedFiles 
      }),
    deletePortfolios: deletePortfoliosMutation.mutateAsync,
    isLoading:
      createPortfoliosMutation.isPending ||
      deletePortfoliosMutation.isPending ||
      uploadPortfolioAssetsMutation.isPending,
  };
};
 