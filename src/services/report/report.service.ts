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

  static async reportBusiness(data: ReportBusiness) {
    const response = await instance.post(
      API_ROUTES.REPORT.REPORT_BUSINESS,
      data
    );
    return response.data;
  }

  static async reportJob(data: ReportJob) {
    const response = await instance.post(API_ROUTES.REPORT.REPORT_JOB, data);
    return response.data;
  }

  static async hasBusinessReportedWorker(workerId: string) {
    const response = await instance.get(
      API_ROUTES.REPORT.HAS_BUSINESS_REPORTED_WORKER(workerId)
    );
    return response.data;
  }
}

export default ReportService;
