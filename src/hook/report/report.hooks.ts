import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/querykey";
import ReportService from "@/services/report/report.service";
import { ReportWorker, ReportBusiness, ReportJob } from "@/types/report.types";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useReportWorker = () => {
  return useMutation({
    mutationKey: [QueryKeys.REPORT_WORKER],
    mutationFn: ({
      data,
      workerId,
    }: {
      data: ReportWorker;
      workerId: string;
    }) => ReportService.reportWorker(data, workerId),
    onSuccess: () => {
      toast.success("Worker reported successfully");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Failed to report worker");
      } else {
        toast.error("Failed to report worker");
      }
    },
  });
};

export const useReportBusiness = () => {
  return useMutation({
    mutationKey: [QueryKeys.REPORT_BUSINESS],
    mutationFn: ({
      data,
      businessId,
    }: {
      data: ReportBusiness;
      businessId: string;
    }) => ReportService.reportBusiness(data, businessId),
    onSuccess: () => {
      toast.success("Business reported successfully");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "Failed to report business"
        );
      } else {
        toast.error("Failed to report business");
      }
    },
  });
};

export const useReportJob = () => {
  return useMutation({
    mutationKey: [QueryKeys.REPORT_JOB],
    mutationFn: ({ data, jobId }: { data: ReportJob; jobId: string }) =>
      ReportService.reportJob(data, jobId),
    onSuccess: () => {
      toast.success("Job reported successfully");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Failed to report job");
      } else {
        toast.error("Failed to report job");
      }
    },
  });
};

export const useHasBusinessReportedWorker = (workerId: string) => {
  return useQuery({
    queryKey: [QueryKeys.HAS_BUSINESS_REPORTED_WORKER, workerId],
    queryFn: () => ReportService.hasBusinessReportedWorker(workerId),
    enabled: !!workerId,
  });
};

export const useHasWorkerReportedJob = (jobId: string) => {
  return useQuery({
    queryKey: [QueryKeys.HAS_WORKER_REPORTED_JOB, jobId],
    queryFn: () => ReportService.hasWorkerReportedJob(jobId),
    enabled: !!jobId,
  });
};

export const useHasWorkerReportedBusiness = (businessId: string) => {
  return useQuery({
    queryKey: [QueryKeys.HAS_WORKER_REPORTED_BUSINESS, businessId],
    queryFn: () => ReportService.hasWorkerReportedBusiness(businessId),
    enabled: !!businessId,
  });
};