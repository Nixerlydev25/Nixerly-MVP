import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import CertificateService from "@/services/worker/certificate.service";
import type {
  Certificate,
  CreateCertificatePayload,
  SaveCertificateAssetsPayload,
} from "@/types/worker.types";
import { QueryKeys } from "@/querykey";

interface CreateCertificatesVariables {
  certificates: CreateCertificatePayload[];
  selectedFiles: { [key: number]: File[] };
}

interface CreateCertificatesResponse {
  message: string;
  certificates: Certificate[];
}

export const useCertificates = () => {
  const queryClient = useQueryClient();

  const uploadCertificateAssetsMutation = useMutation({
    mutationFn: async ({
      files,
      certificateId,
    }: {
      files: File[];
      certificateId: string;
    }) => {
      if (!files.length) {
        console.log('No files to upload for certificate:', certificateId);
        return;
      }

      // Filter out empty file objects
      const validFiles = files.filter(file => file.size > 0 && file.name);
      
      if (!validFiles.length) {
        console.log('No valid files to upload for certificate:', certificateId);
        return;
      }

      console.log('Uploading files for certificate:', certificateId, validFiles);

      // Get presigned URLs for all files
      const response = await CertificateService.getAssetUploadUrl({
        certificateId,
        files: validFiles.map((file) => ({
          fileName: file.name,
          contentType: file.type,
        })),
      });

      console.log('Got presigned URLs:', response);

      // Upload all files to S3
      await Promise.all(
        response.urls.map((urlData) =>
          CertificateService.uploadAsset(
            urlData.presignedUrl,
            validFiles.find(f => f.name === urlData.fileName)!,
            validFiles.find(f => f.name === urlData.fileName)!.type
          )
        )
      );

      // Save the assets in the database
      const payload: SaveCertificateAssetsPayload = {
        certificateId,
        assets: response.urls.map((urlData) => ({
          s3Key: urlData.s3Key,
          mediaType: validFiles.find(f => f.name === urlData.fileName)!.type,
        })),
      };

      return CertificateService.saveAssets(payload);
    },
  });

  const createCertificatesMutation = useMutation<
    CreateCertificatesResponse,
    Error,
    CreateCertificatesVariables
  >({
    mutationFn: async ({ certificates }) => {
      return CertificateService.createCertificates(certificates);
    },
    onSuccess: async (response, variables) => {
      console.log("Certificates created successfully:", response);
      console.log('variables', variables);
      
      // Upload assets for each certificate
      try {
        // Since we're only using index 0 in the form
        const files = variables.selectedFiles[0] || [];
        console.log('Files to upload:', files);

        if (files.length > 0 && response.certificates.length > 0) {
          // Upload files for the first certificate
          const certificate = response.certificates[0];
          await uploadCertificateAssetsMutation.mutateAsync({
            files,
            certificateId: certificate.id,
          });
          console.log(`Successfully uploaded assets for certificate ${certificate.id}`);
        }
      } catch (error) {
        console.error("Error uploading certificate assets:", error);
        toast.error("Failed to upload some certificate images");
      }

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.WORKER_PROFILE_DETAILS],
      });
      toast.success("Certificates added successfully");
    },
  });

  const deleteCertificatesMutation = useMutation({
    mutationFn: async (certificateIds: string[]) => {
      return CertificateService.deleteCertificates(certificateIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.WORKER_PROFILE_DETAILS],
      });
      toast.success("Certificates deleted successfully");
    },
  });

  return {
    createCertificates: (
      certificates: CreateCertificatePayload[],
      selectedFiles: { [key: number]: File[] }
    ) =>
      createCertificatesMutation.mutateAsync({ 
        certificates, 
        selectedFiles 
      }),
    deleteCertificates: deleteCertificatesMutation.mutateAsync,
    isLoading:
      createCertificatesMutation.isPending ||
      deleteCertificatesMutation.isPending ||
      uploadCertificateAssetsMutation.isPending,
  };
};
