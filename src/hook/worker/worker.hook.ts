import { QueryKeys } from '@/querykey';
import WorkerService from '@/services/worker/worker.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FeedsFilter } from '@/types/feed/feed.types';
import {
  WorkerListResponse,
  WorkerProfileResponse,
} from '@/types/worker.types';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';
import S3Service from '@/services/s3/s3.service';
import { z } from 'zod';
import { queryClient } from '@/providers/query.provider';

export const useGetWorkers = (enabled?: boolean) => {
  const searchParams = useSearchParams();

  // Process URL params and set defaults in the hook
  const filters = useMemo(() => {
    const params: FeedsFilter & Record<string, string | number | string[]> = {
      page: 1,
      limit: 15,
    };

    searchParams.forEach((value, key) => {
      switch (key) {
        case 'page':
        case 'limit':
        case 'minHourlyRate':
        case 'maxHourlyRate':
        case 'minTotalEarnings':
        case 'maxTotalEarnings':
        case 'minAvgRating':
        case 'maxAvgRating':
          const numValue = Number(value);
          if (!isNaN(numValue)) {
            params[key] = numValue;
          }
          break;
        case 'skills':
          if (!params.skills) params.skills = [];
          params.skills.push(value);
          break;
        case 'sort':
          if (
            value === 'rating' ||
            value === 'price_low_to_high' ||
            value === 'price_high_to_low'
          ) {
            params[key] = value;
          }
          break;
        default:
          // For other potential string fields like location, search, etc.
          if (value) {
            params[key] = value;
          }
          break;
      }
    });

    return params;
  }, [searchParams]);

  // Extract current page from filters
  const currentPage = useMemo(() => {
    return filters.page || 1;
  }, [filters.page]);

  const query = useQuery<WorkerListResponse>({
    queryKey: [QueryKeys.GET_SKILLS, filters],
    queryFn: () => WorkerService.getWorkers(filters),
    enabled: enabled,
  });

  return {
    ...query,
    currentPage,
    filters,
  };
};

export const useGetWorkerById = (id: string) => {
  return useQuery<WorkerProfileResponse>({
    queryKey: [QueryKeys.GET_WORKER_BY_ID, id],
    queryFn: () => WorkerService.getWorkerById(id),
    enabled: !!id,
  });
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

export const useWorkerProfilePicture = () => {
  const getPresignedUrlMutation = useMutation<
    PresignedUrlResponse,
    Error,
    File
  >({
    mutationKey: [QueryKeys.GET_PROFILE_PICTURE_UPLOAD_URL],
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
          throw new Error(error.errors[0].message);
        }
        throw error;
      }

      return await S3Service.getPresignedUrlWorkerProfilePicture(file.name, file.type);
    },
  });

  const uploadToS3Mutation = useMutation<
    void,
    Error,
    { presignedUrl: string; file: File; s3Key: string }
  >({
    mutationKey: [QueryKeys.UPDATE_PROFILE_PICTURE_S3],
    mutationFn: async ({ presignedUrl, file }) => {
      await S3Service.uploadToS3WorkerProfilePicture(presignedUrl, file, file.type);
    },
  });

  const updateProfilePictureMutation = useMutation({
    mutationKey: [QueryKeys.UPDATE_PROFILE_PICTURE],
    mutationFn: async (key: string) => {
      await WorkerService.updateProfilePicture(key);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.WORKER_PROFILE_DETAILS],
      });
    },
  });

  const uploadProfilePicture = async (file: File, onClose: () => void) => {
    try {
      const { presignedUrl, s3Key } = await getPresignedUrlMutation.mutateAsync(
        file
      );
      await uploadToS3Mutation.mutateAsync({ presignedUrl, file, s3Key });
      await updateProfilePictureMutation.mutateAsync(s3Key);
      onClose();
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
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

export const useGetAppliedJobs = () => {
  const searchParams = useSearchParams();

  const filters = useMemo(() => {
    const params: FeedsFilter & Record<string, string | number | string[]> = {
      page: 1,
      limit: 10,
    };

    searchParams.forEach((value, key) => {
      switch (key) {
        case 'page':
        case 'limit':
          const numValue = Number(value);
          if (!isNaN(numValue)) {
            params[key] = numValue;
          }
          break;
        case 'search':
          params.search = value;
          break;
        case 'startDate':
        case 'endDate':
          params[key] = value;
          break;
      }
    });

    return params;
  }, [searchParams]);

  const currentPage = useMemo(() => {
    return filters.page || 1;
  }, [filters.page]);

  const query = useQuery<any>({
    queryKey: [QueryKeys.GET_APPLIED_JOBS, filters],
    queryFn: () => WorkerService.getAppliedJobs(filters),
    enabled: !!filters.page,
  });

  return {
    ...query,
    currentPage,
    filters,
  };
};
