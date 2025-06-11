import { useMutation, useQuery } from '@tanstack/react-query';
import JobsService from '@/services/jobs/jobs.service';
import { QueryKeys } from '@/querykey';
import {
  Job,
  JobsResponse,
} from '@/app/(dashboard)/worker/feed/_components/types';
import { useSearchParams } from 'next/navigation';
import { JobApplicationSubmitData } from '@/app/(dashboard)/worker/job/[id]/apply/_component/types';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

export const useCreateJob = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [QueryKeys.JOB_CREATE],
    mutationFn: JobsService.createJob,
    onSuccess: () => {
      router.push(ROUTES.MY_JOBS);
    },
    onError: (error) => {
      console.error('Error creating job:', error);
      throw error;
    },
  });
};

export const useGetAllJobs = () => {
  const searchParams = useSearchParams();
  
  const params: Record<string, string | number | string[] | undefined> = {};

  // Base pagination and sorting
  const page = searchParams.get('page');
  if (page) params.page = Number(page);

  const limit = searchParams.get('limit');
  if (limit) params.limit = Number(limit);

  const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc';
  if (sortOrder) params.sortOrder = sortOrder;

  // Search term
  const search = searchParams.get('search');
  if (search && search.trim() !== '') params.search = search;

  // Location params
  const city = searchParams.get('city');
  if (city) params.city = city;

  const state = searchParams.get('state');
  if (state) params.state = state;

  const country = searchParams.get('country');
  if (country) params.country = country;

  // Rate range
  const minHourlyRate = searchParams.get('minHourlyRate');
  if (minHourlyRate) params.minHourlyRate = Number(minHourlyRate);

  const maxHourlyRate = searchParams.get('maxHourlyRate');
  if (maxHourlyRate) params.maxHourlyRate = Number(maxHourlyRate);

  // Budget
  const budget = searchParams.get('budget');
  if (budget) params.budget = Number(budget);

  // Status
  const status = searchParams.get('status');
  if (status) params.status = status;

  // Skills (assuming it comes as a comma-separated string)
  const skills = searchParams.get('skills');
  if (skills) params.skills = skills.split(',');

  return useQuery<JobsResponse>({
    queryKey: [QueryKeys.JOB_GET_ALL, params],
    queryFn: () => JobsService.getAlljobs(params),
  });
};

export const useGetSingleJob = (param?: string) => {
  return useQuery<Job>({
    queryKey: [QueryKeys.JOB_DETAILS, param],
    queryFn: () => JobsService.getJobDetails(param),
  });
};

export const useApplyJobs = () => {
  return useMutation({
    mutationKey: [QueryKeys.APPLY_JOB],
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: JobApplicationSubmitData;
    }) => JobsService.applyForJob(id, data),
  });
};

export const useListMyJobs = () => {
  const searchParams = useSearchParams();
  const params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
  } = {
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
  };

  if (searchParams.get('search')) {
    params.search = searchParams.get('search') || '';
  }

  if (searchParams.get('status')) {
    params.status = searchParams.get('status') || '';
  }
  return useQuery<JobsResponse>({
    queryKey: [QueryKeys.JOB_GET_ALL, params],
    queryFn: () => JobsService.getMyJobs(params),
  });
};

interface JobApplicantResponse {
  id: string;
  jobId: string;
  workerProfileId: string;
  coverLetter: string;
  proposedRate: number;
  duration: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  workerProfile: {
    phoneNumber: string;
    profilePicture: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  appliedAt: string;
  paymentType: 'hourly' | 'fixed';
  hourlyRate?: string;
  fixedBudget?: string;
  estimatedDuration: string;
  relevantExperience: string;
  certifications?: string;
}

interface JobApplicantsResponse {
  applicants: JobApplicantResponse[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    hasMore: boolean;
  };
  stats: {
    totalApplications: number;
    averageHourlyRateProposed: number;
  };
}

export const useGetJobApplicants = (jobId: string) => {
  const searchParams = useSearchParams();
  const params = {
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    search: searchParams.get('search') || '',
  };

  return useQuery<JobApplicantsResponse>({
    queryKey: [QueryKeys.GET_JOB_APPLICANTS, jobId, params],
    queryFn: () => JobsService.getJobsApplicants(jobId, params),
  });
};
