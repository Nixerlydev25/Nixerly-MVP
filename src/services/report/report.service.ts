import { ReportWorker, ReportBusiness, ReportJob } from '@/types/report.types';
import instance from '../api';
import { API_ROUTES } from '@/constants/routes';

class ReportService {
  static async reportWorker(data: ReportWorker, workerId: string) {
    const response = await instance.post(
      API_ROUTES.REPORT.REPORT_WORKER(workerId),
      data
    );
    return response.data;
  }

  static async reportBusiness(data: ReportBusiness, businessId: string) {
    const response = await instance.post(
      API_ROUTES.REPORT.REPORT_BUSINESS(businessId),
      data
    );
    return response.data;
  }

  static async reportJob(data: ReportJob, jobId: string) {
    const response = await instance.post(
      API_ROUTES.REPORT.REPORT_JOB(jobId),
      data
    );
    return response.data;
  }

  static async hasBusinessReportedWorker(workerId: string) {
    const response = await instance.get(
      API_ROUTES.REPORT.HAS_BUSINESS_REPORTED_WORKER(workerId)
    );
    return response.data;
  }

  static async hasWorkerReportedJob(jobId: string) {
    const response = await instance.get(
      API_ROUTES.REPORT.HAS_WORKER_REPORTED_JOB(jobId)
    );
    return response.data;
  }

  static async hasWorkerReportedBusiness(businessId: string) {
    const response = await instance.get(
      API_ROUTES.REPORT.HAS_WORKER_REPORTED_BUSINESS(businessId)
    );
    return response.data;
  }
}

export default ReportService;
