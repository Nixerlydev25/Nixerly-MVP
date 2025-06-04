import { useMutation, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/querykey';
import ReportService from '@/services/report/report.service';
import { ReportWorker, ReportBusiness, ReportJob } from '@/types/report.types';

export const useReportWorker = () => {
  return useMutation({
    mutationKey: [QueryKeys.REPORT_WORKER],
    mutationFn: ({ data, workerId }: { data: ReportWorker; workerId: string }) =>
      ReportService.reportWorker(data, workerId),
  });
};

export const useReportBusiness = () => {
  return useMutation({
    mutationKey: [QueryKeys.REPORT_BUSINESS],
    mutationFn: (data: ReportBusiness) => ReportService.reportBusiness(data),
  });
};

export const useReportJob = () => {
  return useMutation({
    mutationKey: [QueryKeys.REPORT_JOB],
    mutationFn: (data: ReportJob) => ReportService.reportJob(data),
  });
};

export const useHasBusinessReportedWorker = (workerId: string) => {
  return useQuery({
    queryKey: [QueryKeys.HAS_BUSINESS_REPORTED_WORKER, workerId],
    queryFn: () => ReportService.hasBusinessReportedWorker(workerId),
    enabled: !!workerId,
  });
};