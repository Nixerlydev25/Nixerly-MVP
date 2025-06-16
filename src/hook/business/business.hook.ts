import { useQuery, UseQueryResult } from "@tanstack/react-query";
import BusinessService from "@/services/business/business.service";
import { TBusinessDetails } from "@/types/auth";
import { QueryKeys } from "@/querykey";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { queryClient } from "@/providers/query.provider";

export const useGetBusinessById = (id: string) => {
  return useQuery({
    queryKey: ["business", id],
    queryFn: () => BusinessService.getBusinessById(id),
    enabled: !!id,
  }) as UseQueryResult<TBusinessDetails, Error>;
};

const getProfilePictureUploadUrlSchema = z.object({
  contentType: z
    .string()
    .regex(/^image\/(jpeg|png|gif|webp)$/, "Invalid image format"),
  fileName: z.string().min(1, "File name is required"),
});

type PresignedUrlResponse = {
  presignedUrl: string;
  s3Key: string;
};

export const useBusinessProfilePicture = () => {
  const getPresignedUrlMutation = useMutation<
    PresignedUrlResponse,
    Error,
    File
  >({
    mutationKey: [QueryKeys.GET_BUSINESS_PROFILE_PICTURE_UPLOAD_URL],
    mutationFn: async (file: File) => {
      if (!file) throw new Error("No file provided");

      // Validate file
      try {
        getProfilePictureUploadUrlSchema.parse({
          contentType: file.type,
          fileName: file.name,
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          toast.error(error.errors[0].message);
          throw new Error(error.errors[0].message);
        }
        throw error;
      }

      return await BusinessService.getProfilePictureUploadUrl(
        file.name,
        file.type
      );
    },
  });

  const uploadToS3Mutation = useMutation<
    void,
    Error,
    { presignedUrl: string; file: File }
  >({
    mutationKey: [QueryKeys.UPDATE_BUSINESS_PROFILE_PICTURE_S3],
    mutationFn: async ({ presignedUrl, file }) => {
      await BusinessService.uploadToS3(presignedUrl, file);
    },
  });

  const updateProfilePictureMutation = useMutation({
    mutationKey: [QueryKeys.UPDATE_BUSINESS_PROFILE_PICTURE],
    mutationFn: async (key: string) => {
      await BusinessService.saveProfilePicture(key);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BUSINESS_PROFILE_DETAILS],
      });
    },
  });

  const uploadProfilePicture = async (file: File, onClose: () => void) => {
    try {
      const { presignedUrl, s3Key } = await getPresignedUrlMutation.mutateAsync(
        file
      );
      await uploadToS3Mutation.mutateAsync({ presignedUrl, file });
      await updateProfilePictureMutation.mutateAsync(s3Key);
      onClose();
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("There was an error uploading your profile picture");
    }
  };

  return {
    uploadProfilePicture,
    isPending:
      getPresignedUrlMutation.isPending ||
      uploadToS3Mutation.isPending ||
      updateProfilePictureMutation.isPending,
  };
};

export const useCompanyImages = () => {
  const getAssetsUploadUrlMutation = useMutation({
    mutationKey: [QueryKeys.GET_COMPANY_ASSETS_UPLOAD_URL],
    mutationFn: async (files: File[]) => {
      if (!files.length) throw new Error("No files provided");

      const fileRequests = files.map(file => ({
        fileName: file.name,
        contentType: file.type,
      }));

      return await BusinessService.getAssetsUploadUrl(fileRequests);
    },
  });

  const uploadToS3Mutation = useMutation({
    mutationKey: [QueryKeys.UPLOAD_COMPANY_ASSETS_TO_S3],
    mutationFn: async ({ presignedUrl, file }: { presignedUrl: string; file: File }) => {
      await BusinessService.uploadToS3(presignedUrl, file);
    },
  });

  const saveAssetsMutation = useMutation({
    mutationKey: [QueryKeys.SAVE_COMPANY_ASSETS],
    mutationFn: async (assets: Array<{ s3Key: string; mediaType: string }>) => {
      await BusinessService.saveAssets(assets);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BUSINESS_PROFILE_DETAILS],
      });
    },
  });

  const deleteAssetsMutation = useMutation({
    mutationKey: [QueryKeys.DELETE_COMPANY_ASSETS],
    mutationFn: async (assetIds: string[]) => {
      await BusinessService.deleteAssets(assetIds);
    },
    onSuccess: () => {
      toast.success("Assets deleted successfully");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BUSINESS_PROFILE_DETAILS],
      });
    },
  });

  const uploadCompanyImages = async (files: File[], onClose: () => void) => {
    try {
      const { urls } = await getAssetsUploadUrlMutation.mutateAsync(files);
      
      // Upload all files to S3 in parallel
      await Promise.all(
        urls.map((url, index) =>
          uploadToS3Mutation.mutateAsync({
            presignedUrl: url.presignedUrl,
            file: files[index],
          })
        )
      );

      // Save the uploaded assets with their media types
      await saveAssetsMutation.mutateAsync(
        urls.map((url, index) => ({
          s3Key: url.s3Key,
          mediaType: files[index].type,
        }))
      );
      
      toast.success("Company images uploaded successfully");
      onClose();
    } catch (error) {
      console.error("Error uploading company images:", error);
      toast.error("There was an error uploading your company images");
    }
  };

  return {
    uploadCompanyImages,
    deleteAssets: deleteAssetsMutation.mutate,
    isPending:
      getAssetsUploadUrlMutation.isPending ||
      uploadToS3Mutation.isPending ||
      saveAssetsMutation.isPending ||
      deleteAssetsMutation.isPending,
  };
};
