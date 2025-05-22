import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import JobsService from '@/services/jobs/jobs.service';
import { toast } from 'sonner';
import { QueryKeys } from '@/querykey';
import {
  Job,
  JobsResponse,
} from '@/app/(dashboard)/worker/feed/_components/types';
import { useSearchParams } from 'next/navigation';
import { JobApplicationSubmitData } from '@/app/(dashboard)/worker/job/[id]/apply/_component/types';

export const useCreateJob = () => {
  return useMutation({
    mutationKey: [QueryKeys.JOB_CREATE],
    mutationFn: JobsService.createJob,
    onSuccess: () => {
      toast.success('Job created successfully');
    },
    onError: () => {
      toast.error('Failed to create job');
    },
  });
};

export const useGetAllJobs = () => {
  const searchParams = useSearchParams();
  const params = {
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
    search: searchParams.get('search') || '',
    minHourlyRate: Number(searchParams.get('minHourlyRate')) || 0,
    maxHourlyRate: Number(searchParams.get('maxHourlyRate')) || 100,
    status: searchParams.get('status') || undefined,
  };
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
    mutationFn: ({ id, data }: { id: string; data: JobApplicationSubmitData }) =>
      JobsService.applyForJob(id, data),
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
    user: {
      firstName: string;
      lastName: string;
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
  return useQuery<JobApplicantsResponse>({
    queryKey: [QueryKeys.GET_JOB_APPLICANTS, jobId],
    queryFn: () => JobsService.getJobsApplicants(jobId),
  });
};
