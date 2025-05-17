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
  certificates: Record<string, unknown>;
  portfolio: Record<string, unknown>;
  isVerified: boolean;
}

export interface WorkerProfileResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "WORKER";
  workerProfile: WorkerProfile;
  createdAt: string;
  updatedAt: string;
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