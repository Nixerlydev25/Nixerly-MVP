import { API_ROUTES } from '@/constants/routes';
import instance from '../api';
import { JobsResponse } from '@/app/(dashboard)/worker/feed/_components/types';
import { JobApplicationSubmitData } from '@/app/(dashboard)/worker/job/[id]/apply/_component/types';

interface GetAllJobsParams {
  page?: number;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  budget?: number;
  skills?: string[];
  country?: string;
  state?: string;
  city?: string;
  minHourlyRate?: number;
  maxHourlyRate?: number;
  status?: string;
}

interface getMyJobsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

interface JobApplicantsParams {
  page?: number;
  limit?: number;
  search?: string;
}

class JobsService {
  static async createJob(data: {
    title: string;
    description: string;
    budget?: number | null;
    salary?: number | null;
    hourlyRateMin?: number | null;
    hourlyRateMax?: number | null;
    status: string;
    skills: string[];
    requirements: string;
    jobType: 'HOURLY' | 'CONTRACT' | 'SALARY';
    location: {
      city: string;
      state: string;
      country: string;
      street?: string;
      postalCode?: string;
    };
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

  static async applyForJob(id: string, data: JobApplicationSubmitData) {
    const response = await instance.post(API_ROUTES.JOB.APPLY(id), data);
    return response;
  }

  static async getMyJobs(params?: getMyJobsParams) {
    const response = await instance.get(API_ROUTES.JOB.GET_MY_JOBS, { params });
    return response.data;
  }

  static async getJobsApplicants(jobId: string, params?: JobApplicantsParams) {
    const response = await instance.get(
      API_ROUTES.JOB.GET_JOB_APPLICANTS(jobId),
      { params }
    );
    return response.data.data;
  }

  static async toggleClientJobVisibility(jobId: string) {
    const response = await instance.post(
      API_ROUTES.JOB.TOGGLE_JOB_STATUS(jobId)
    );
    return response.data;
  }
}

export default JobsService;
