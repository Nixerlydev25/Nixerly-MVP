export enum ReportCategory {
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

export enum ReportJobsCategory {
  SCAM_FRAUD = 'SCAM_FRAUD',
  INAPPROPRIATE = 'INAPPROPRIATE',
  MISLEADING = 'MISLEADING',
  PRIVACY_VIOLATION = 'PRIVACY_VIOLATION',
  SPAM = 'SPAM',
  DUPLICATE = 'DUPLICATE',
  EXPIRED = 'EXPIRED',
  ILLEGAL = 'ILLEGAL',
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
  category: ReportCategory;
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
  reason: ReportCategory;
  description: string;
}

export interface ReportBusiness {
  targetBusinessId: string;
  reason: string;
  category: ReportCategory;
}

export interface ReportJob {
  targetJobId: string;
  reason: string;
  category: ReportJobsCategory;
}
