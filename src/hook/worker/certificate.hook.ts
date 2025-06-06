import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import CertificateService from '@/services/worker/certificate.service';
import type {
  Certificate,
  CreateCertificatePayload,
  SaveCertificateAssetsPayload,
} from '@/types/worker.types';
import { QueryKeys } from '@/querykey';

export const useCertificates = () => {
  const queryClient = useQueryClient();

  const createCertificatesMutation = useMutation({
    mutationFn: async (certificates: CreateCertificatePayload[]) => {
      return CertificateService.createCertificates(certificates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WORKER_PROFILE_DETAILS] });
      toast.success('Certificates added successfully');
    },
  });

  const deleteCertificatesMutation = useMutation({
    mutationFn: async (certificateIds: string[]) => {
      return CertificateService.deleteCertificates(certificateIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WORKER_PROFILE_DETAILS] });
      toast.success('Certificates deleted successfully');
    },
  });

  const uploadCertificateAssetsMutation = useMutation({
    mutationFn: async ({
      files,
      certificateId,
    }: {
      files: File[];
      certificateId: string;
    }) => {
      // Get presigned URLs for all files
      const { presignedUrls } = await CertificateService.getAssetUploadUrl({
        certificateId,
        files: files.map((file) => ({
          fileName: file.name,
          contentType: file.type,
        })),
      });

      // Upload all files to S3
      await Promise.all(
        files.map((file, index) =>
          CertificateService.uploadAsset(
            presignedUrls[index].url,
            file,
            file.type
          )
        )
      );

      // Save the assets in the database
      const payload: SaveCertificateAssetsPayload = {
        certificateId,
        assets: presignedUrls.map((url, index) => ({
          s3Key: url.key,
          mediaType: files[index].type,
        })),
      };

      return CertificateService.saveAssets(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WORKER_PROFILE_DETAILS] });
      toast.success('Certificate images uploaded successfully');
    },
  });

  return {
    createCertificates: createCertificatesMutation.mutateAsync,
    deleteCertificates: deleteCertificatesMutation.mutateAsync,
    uploadCertificateAssets: uploadCertificateAssetsMutation.mutateAsync,
    isLoading:
      createCertificatesMutation.isPending ||
      deleteCertificatesMutation.isPending ||
      uploadCertificateAssetsMutation.isPending,
  };
}; 