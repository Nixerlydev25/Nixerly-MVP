import { API_ROUTES } from '@/constants/routes';
import instance from '../api';
import { JobsResponse } from '@/app/(dashboard)/worker/feed/_components/types';
import { JobApplicationSubmitData } from '@/app/(dashboard)/worker/job/[id]/apply/_component/types';

interface GetAllJobsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  minHourlyRate?: number;
  maxHourlyRate?: number;
  status?: string;
}

class JobsService {
  static async createJob(data: {
    title: string;
    description: string;
    budget: number;
    hourlyRateMin: number;
    hourlyRateMax: number;
    status: string;
    skills: string[];
    requirements: string;
  }): Promise<unknown> {
    const response = await instance.post(API_ROUTES.JOB.CREATE, data);
    return response.data;
  }

  static async getAlljobs(params?: GetAllJobsParams): Promise<JobsResponse> {
    const response = await instance.get(API_ROUTES.JOB.LIST, { params });
    return response.data as JobsResponse;
  }

  static async getJobDetails(param?: string) {
    const response = await instance.get(API_ROUTES.JOB.GET_DETAILS(param));
    return response.data;
  }

  static async applyForJob(
    id: string,
    data: JobApplicationSubmitData,
  ) {
    const response = await instance.post(API_ROUTES.JOB.APPLY(id), data);
    return response;
  }
}

export default JobsService;
