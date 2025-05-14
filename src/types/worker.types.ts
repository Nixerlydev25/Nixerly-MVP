import { OnboardingStepWorkerProfileB } from "./onboarding";

export interface WorkerUser {
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
  role: string;
  provider: string;
  defaultProfile: string;
  firstTimeLogin: boolean;
}

export interface WorkerExperience {
  id: string;
  workerId: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

export interface WorkerEducation {
  id: string;
  workerId: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  currentlyStudying: boolean;
  endDate: string;
  description: string;
}

export interface WorkerLanguage {
  id: string;
  workerId: string;
  language: string;
  proficiency: string;
}

export interface WorkerProfileResponse {
  id: string;
  userId: string;
  title: string;
  description: string;
  city: string;
  state: string;
  country: string;
  hourlyRate: number;
  availability: boolean;
  totalEarnings: number;
  completedJobs: number;
  avgRating: number;
  onboardingStep: OnboardingStepWorkerProfileB | string;
  user: WorkerUser;
  skills: string[];
  experience: WorkerExperience[];
  education: WorkerEducation[];
  languages: WorkerLanguage[];
}

export interface WorkerListResponse {
  data: WorkerProfileResponse[];
  totalCount: number;
  totalPages: number;
  currentPage: string;
  hasMore: boolean;
  filters: {
    applied: Record<string, unknown>;
  };
}