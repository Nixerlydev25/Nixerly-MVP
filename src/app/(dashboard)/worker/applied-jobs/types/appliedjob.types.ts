export interface BusinessProfile {
  companyName: string;
  city: string;
  state: string;
  country: string;
}

export interface Location {
  id: string;
  jobId: string;
  street: string | null;
  city: string;
  state: string;
  country: string;
  postalCode: string | null;
  isRemote: boolean;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  employmentType: string;
  numberOfPositions: number;
  budget: number | null;
  hourlyRateMin: number;
  hourlyRateMax: number;
  salary: number | null;
  businessProfileId: string;
  status: string;
  jobType: 'HOURLY' | 'SALARY' | 'CONTRACT';
  startDate: string;
  numberOfWorkersRequired: number;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
  isBlocked: boolean;
  businessProfile: BusinessProfile;
  location: Location;
}

export interface Application {
  id: string;
  jobId: string;
  workerProfileId: string;
  coverLetter: string;
  proposedRate: number;
  workerStartDateAvailability: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  duration: string;
  job: Job;
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

export interface AppliedJobsData {
  applications: Application[];
  pagination: Pagination;
}

export interface AppliedJobsResponse {
  applications: Application[];
  pagination: Pagination;
} 