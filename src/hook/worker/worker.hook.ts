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
import S3Service from '@/services/s3/s3.service';
import { z } from 'zod';
import { queryClient } from '@/providers/query.provider';

export const useGetWorkers = (enabled?: boolean) => {
  const searchParams = useSearchParams();

  // Process URL params and set defaults in the hook
  const filters = useMemo(() => {
    const params: FeedsFilter & Record<string, string | number | string[]> = {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 10,
    };

    // Handle skills array
    const skills = searchParams.get('skills');
    if (skills && skills.trim() !== '') {
      params.skills = skills.split(',');
    }

    // Handle sort parameter
    const sort = searchParams.get('sort');
    if (sort && ['rating', 'price_low_to_high', 'price_high_to_low'].includes(sort)) {
      params.sort = sort as 'rating' | 'price_low_to_high' | 'price_high_to_low';
    }

    // Handle search parameter
    const search = searchParams.get('search');
    if (search && search.trim() !== '') {
      params.search = search;
    }

    // Handle numeric parameters with validation
    const numericParams = [
      'minHourlyRate',
      'maxHourlyRate',
      'minTotalEarnings',
      'maxTotalEarnings',
      'minAvgRating',
      'maxAvgRating'
    ] as const;

    numericParams.forEach(param => {
      const value = searchParams.get(param);
      if (value) {
        const numValue = Number(value);
        if (!isNaN(numValue)) {
          params[param] = numValue;
        }
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

// Define the applied jobs response type
interface AppliedJobsResponse {
  data: Array<{
    id: string;
    title: string;
    status: string;
    appliedAt: string;
    // Add other fields as needed
  }>;
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    hasMore: boolean;
  };
}

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

  const query = useQuery<AppliedJobsResponse>({
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
