export enum WorkerReportReason {
  INAPPROPRIATE_BEHAVIOR = 'INAPPROPRIATE_BEHAVIOR',
  MISREPRESENTATION_OF_SKILLS = 'MISREPRESENTATION_OF_SKILLS',
  UNPROFESSIONAL_CONDUCT = 'UNPROFESSIONAL_CONDUCT',
  HARASSMENT = 'HARASSMENT',
  DISCRIMINATION = 'DISCRIMINATION',
  POOR_COMMUNICATION = 'POOR_COMMUNICATION',
  NO_SHOW = 'NO_SHOW',
  FRAUDULENT_ACTIVITY = 'FRAUDULENT_ACTIVITY',
  VIOLATION_OF_TERMS = 'VIOLATION_OF_TERMS',
  OTHER = 'OTHER',
}

export enum BusinessReportReason {
  PAYMENT_ISSUES = 'PAYMENT_ISSUES',
  HARASSMENT = 'HARASSMENT',
  DISCRIMINATION = 'DISCRIMINATION',
  FRAUDULENT_ACTIVITY = 'FRAUDULENT_ACTIVITY',
  UNPROFESSIONAL_CONDUCT = 'UNPROFESSIONAL_CONDUCT',
  MISLEADING_JOB_DESCRIPTION = 'MISLEADING_JOB_DESCRIPTION',
  VIOLATION_OF_TERMS = 'VIOLATION_OF_TERMS',
  POOR_COMMUNICATION = 'POOR_COMMUNICATION',
  SCAM = 'SCAM',
  OTHER = 'OTHER',
}

export enum ReportJobsCategory {
  MISLEADING_DESCRIPTION = 'MISLEADING_DESCRIPTION',
  INAPPROPRIATE_REQUIREMENTS = 'INAPPROPRIATE_REQUIREMENTS',
  DISCRIMINATORY_CONTENT = 'DISCRIMINATORY_CONTENT',
  UNREALISTIC_EXPECTATIONS = 'UNREALISTIC_EXPECTATIONS',
  ILLEGAL_ACTIVITY = 'ILLEGAL_ACTIVITY',
  FRAUDULENT_JOB_POSTING = 'FRAUDULENT_JOB_POSTING',
  PAYMENT_ISSUES = 'PAYMENT_ISSUES',
  VIOLATION_OF_TERMS = 'VIOLATION_OF_TERMS',
  SCAM = 'SCAM',
  OTHER = 'OTHER',
}

export enum ReportStatus {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

export interface BaseReport {
  id: string;
  reason: string;
  category: WorkerReportReason;
  status: ReportStatus;
  reporterWorkerId?: string;
  reporterBusinessId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobReport extends BaseReport {
  jobId: string;
}

export interface WorkerReport extends BaseReport {
  targetWorkerId: string;
}

export interface BusinessReport extends BaseReport {
  targetBusinessId: string;
}

export interface ReportWorker {
  reason: WorkerReportReason;
  description: string;
}

export interface ReportBusiness {
  reason: BusinessReportReason;
  description: string;
}

export interface ReportJob {
  description: string;
  reason: ReportJobsCategory;
}
