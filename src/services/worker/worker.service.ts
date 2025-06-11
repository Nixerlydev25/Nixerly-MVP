import instance from '../api';
import { API_ROUTES } from '@/constants/routes';
import { FeedsFilter, AppliedJobsFilter } from '@/types/feed/feed.types';
import {
  WorkerListResponse,
  WorkerProfileResponse,
} from '@/types/worker.types';

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

class WorkerService {
  static async getWorkers(
    filters: FeedsFilter = {}
  ): Promise<WorkerListResponse> {
    try {
      const params = new URLSearchParams();

      const filterConfig: {
        [key in keyof FeedsFilter]?: 'array' | 'number' | 'string';
      } = {
        page: 'number',
        limit: 'number',
        skills: 'array',
        minHourlyRate: 'number',
        maxHourlyRate: 'number',
        minTotalEarnings: 'number',
        maxTotalEarnings: 'number',
        minAvgRating: 'number',
        maxAvgRating: 'number',
        sort: 'string',
        search: 'string',
      };

      (Object.keys(filterConfig) as Array<keyof FeedsFilter>).forEach((key) => {
        const value = filters[key];
        if (value === undefined || value === null) return;
        if (typeof value === 'string' && value.trim() === '') return;

        const configType = filterConfig[key];

        if (configType === 'array' && Array.isArray(value)) {
          value.forEach((item) => params.append(key, item.toString()));
        } else if (configType === 'number' && typeof value === 'number') {
          params.append(key, value.toString());
        } else if (configType === 'string' && typeof value === 'string') {
          params.append(key, value);
        }
      });

      const response = await instance.get(
        `${API_ROUTES.WORKER.LIST}?${params}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching workers:', error);
      throw error;
    }
  }

  static async getWorkerById(id: string): Promise<WorkerProfileResponse> {
    try {
      const response = await instance.get(`${API_ROUTES.WORKER.BY_ID(id)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching worker by ID:', error);
      throw error;
    }
  }

  static async updateProfilePicture(
    s3Key: string
  ): Promise<{ profilePictureUrl: string }> {
    try {
      const response = await instance.put(
        API_ROUTES.WORKER.UPDATE_PROFILE_PICTURE,
        {
          s3Key,
        }
      );
      return response.data.file;
    } catch (error) {
      console.error('Error updating profile picture:', error);
      throw error;
    }
  }

  static async getAppliedJobs(filters: AppliedJobsFilter): Promise<AppliedJobsResponse> {
    const params = new URLSearchParams();

    const filterConfig: {
      [key in keyof AppliedJobsFilter]?: 'array' | 'number' | 'string';
    } = {
      page: 'number',
      limit: 'number',
      search: 'string',
      startDate: 'string',
      endDate: 'string',
    };

    (Object.keys(filterConfig) as Array<keyof AppliedJobsFilter>).forEach((key) => {
      const value = filters[key];
      if (value === undefined || value === null) return;

      const configType = filterConfig[key];

      if (configType === 'array' && Array.isArray(value)) {
        value.forEach((item) => params.append(key, item.toString()));
      } else if (configType === 'number' && typeof value === 'number') {
        params.append(key, value.toString());
      } else if (configType === 'string' && typeof value === 'string') {
        params.append(key, value);
      }
    });

    try {
      const response = await instance.get(
        `${API_ROUTES.USER.APPLIED_JOBS}?${params}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      throw error;
    }
  }
}

export default WorkerService;
