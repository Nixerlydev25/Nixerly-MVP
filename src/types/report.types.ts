export enum ReportCategory {
  HARASSMENT = 'HARASSMENT',
  SPAM = 'SPAM',
  INAPPROPRIATE_CONTENT = 'INAPPROPRIATE_CONTENT',
  FRAUD = 'FRAUD',
  FAKE_PROFILE = 'FAKE_PROFILE',
  HATE_SPEECH = 'HATE_SPEECH',
  VIOLENCE = 'VIOLENCE',
  INTELLECTUAL_PROPERTY = 'INTELLECTUAL_PROPERTY',
  IMPERSONATION = 'IMPERSONATION',
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
  targetWorkerId: string;
  reason: string;
  category: ReportCategory;
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
