import { useMutation, useQuery } from "@tanstack/react-query";
import JobsService from "@/services/jobs/jobs.service";
import { toast } from "sonner";
import { QueryKeys } from "@/querykey";
import { JobsResponse } from "@/app/(dashboard)/worker/feed/_components/types";
import { useSearchParams } from "next/navigation";

export const useCreateJob = () => {
  return useMutation({
    mutationKey: [QueryKeys.JOB_CREATE],
    mutationFn: JobsService.createJob,
    onSuccess: () => {
      toast.success("Job created successfully");
    },
    onError: () => {
      toast.error("Failed to create job");
    },
  });
};

export const useGetAllJobs = () => {
  const searchParams = useSearchParams();
  const params = {
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    search: searchParams.get("search") || "",
    minHourlyRate: Number(searchParams.get("minHourlyRate")) || 0,
    maxHourlyRate: Number(searchParams.get("maxHourlyRate")) || 100,
    status: searchParams.get("status") || undefined,
  };
  return useQuery<JobsResponse>({
    queryKey: [QueryKeys.JOB_GET_ALL, params],
    queryFn: () => JobsService.getAlljobs(params),
  });
};

export const useGetSingleJob = (param?:string)=>{
  return useQuery<JobsResponse>({
    queryKey: [QueryKeys.JOB_DETAILS, param],
    queryFn: () => JobsService.getJobDetails(param),
  });
}