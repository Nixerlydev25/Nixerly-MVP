export interface WorkerUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "WORKER";
  workerProfile: WorkerProfile;
}

export interface WorkerExperience {
  id: string;
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  city: string;
  state: string;
  country: string;
}

export interface WorkerEducation {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  description: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  city: string;
  state: string;
  country: string;
}

export interface WorkerLanguage {
  id: string;
  language: string;
  proficiency: string;
}

export interface WorkerProfile {
  id: string;
  title: string;
  description: string;
  hourlyRate: number;
  availability: boolean;
  city: string;
  state: string;
  country: string;
  profilePicture: string;
  avgRating: number;
  completedJobs: number;
  createdAt: string;
  updatedAt: string;
  totalEarnings: number;
  onboardingStep: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  skills: string[];
  experience: WorkerExperience[];
  education: WorkerEducation[];
  languages: WorkerLanguage[];
  certificates: Certificate[];
  portfolio: Record<string, unknown>;
  isVerified: boolean;
}

export interface WorkerProfileResponse {
  id: string;
  userId: string;
  title: string;
  description: string;
  hourlyRate: number;
  availability: boolean;
  city: string;
  state: string;
  country: string;
  totalEarnings: number;
  completedJobs: number;
  avgRating: number;
  profilePicture: string;
  onboardingStep: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  skills: string[];
  experience: WorkerExperience[];
  education: WorkerEducation[];
  languages: WorkerLanguage[];
  certificates: Certificate[];
  user: {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    isVerified: boolean;
    isDeleted: boolean;
    isSuspended: boolean;
    role: "WORKER";
    provider: string;
    defaultProfile: string;
    firstTimeLogin: boolean;
  };
}

export interface WorkerListResponse {
  data: WorkerProfileResponse[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
  filters: {
    applied: Record<string, unknown>;
  };
}

export enum CertificateType {
  SAFE_PASS = "SAFE_PASS",
  MANUAL_HANDLING = "MANUAL_HANDLING",
  WORKING_AT_HEIGHT = "WORKING_AT_HEIGHT",
  PASMA = "PASMA",
  IPAF = "IPAF",
  ABRASIVE_WHEELS = "ABRASIVE_WHEELS",
  CONFINED_SPACE_ENTRY = "CONFINED_SPACE_ENTRY",
  FIRST_AID_AT_WORK = "FIRST_AID_AT_WORK",
  FIRE_WARDEN = "FIRE_WARDEN",
  CSCS = "CSCS",
  QQI_ELECTRICIAN = "QQI_ELECTRICIAN",
  QQI_PLUMBER = "QQI_PLUMBER",
  QQI_CARPENTER = "QQI_CARPENTER",
  QQI_BRICKLAYER = "QQI_BRICKLAYER",
  QQI_PLASTERER = "QQI_PLASTERER",
  OTHER = "OTHER"
}

export interface Certificate {
  id: string;
  workerId: string;
  name: string;
  issuingOrg: string;
  issueDate: string;
  expiryDate?: string | null;
  credentialUrl?: string;
  certificateType: CertificateType;
  assets: CertificateAsset[];
}

export interface CertificateAsset {
  url: string;
  key: string;
  mediaType: string;
}

export interface CreateCertificatePayload {
  name: string;
  issuingOrg: string;
  issueDate: string;
  expiryDate?: string | null;
  credentialUrl?: string;
  certificateType: CertificateType;
}

export interface UploadCertificateAssetPayload {
  certificateId: string;
  files: Array<{
    fileName: string;
    contentType: string;
  }>;
}

export interface SaveCertificateAssetsPayload {
  certificateId: string;
  assets: Array<{
    s3Key: string;
    mediaType: string;
  }>;
}