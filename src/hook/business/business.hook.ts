import { useQuery, UseQueryResult } from "@tanstack/react-query";
import BusinessService from "@/services/business/business.service";
import { TBusinessDetails } from "@/types/auth";
import { QueryKeys } from '@/querykey';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { toast } from 'sonner';
import { queryClient } from '@/providers/query.provider';

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
    .regex(/^image\/(jpeg|png|gif|webp)$/, 'Invalid image format'),
  fileName: z.string().min(1, 'File name is required'),
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
      if (!file) throw new Error('No file provided');

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

      return await BusinessService.getProfilePictureUploadUrl(file.name, file.type);
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
      toast.success('Profile picture updated successfully');
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
      console.error('Error uploading profile picture:', error);
      toast.error('There was an error uploading your profile picture');
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
