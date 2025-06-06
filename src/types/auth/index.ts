import {
  OnboardingStepBusinessProfileB,
  OnboardingStepWorkerProfileB,
} from '../onboarding';
import { ProfileType } from '../user/user.types';

// Base interface for common fields
interface BaseSignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}

// Professional interface
interface ProfessionalSignUpRequest extends BaseSignUpRequest {
  profileType: ProfileType.WORKER;
}

// Business interface with additional company field
interface BusinessSignUpRequest extends BaseSignUpRequest {
  profileType: ProfileType.BUSINESS;
}

// Union type to represent both types
export type SignUpRequest = ProfessionalSignUpRequest | BusinessSignUpRequest;

export interface SignInRequest {
  email: string;
  password: string;
}

// Core User type without profiles
export interface TUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  isDeleted: boolean;
  isSuspended: boolean;
  role: Role;
  provider: OAuthProvider;
  defaultProfile: ProfileType;
  firstTimeLogin: boolean;
  businessProfile?: {
    profilePicture?: string | null;
  };
  workerProfile?: {
    profilePicture?: string | null;
  }
}

// Worker Profile type
export interface TWorkerProfile {
  title?: string | null;
  createdAt: string;
  updatedAt: string;
  hourlyRate?: number | null;
  description?: string | null;
  skills?: string[] | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  availability?: boolean;
  totalEarnings?: number;
  completedJobs?: number;
  avgRating?: number;
  onboardingStep?: OnboardingStepWorkerProfileB;
  profilePicture?: string | null;
}

// Business Profile type
export interface TBusinessProfile {
  companyName?: string | null;
  description?: string | null;
  industry?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  website?: string | null;
  employeeCount?: number | null;
  yearFounded?: number | null;
  postedJobs?: number;
  logoUrl?: string | null;
  onboardingStep?: OnboardingStepBusinessProfileB;
  profilePicture?: string | null;
}

export interface TBusinessProfileResponse {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  businessProfile: TBusinessProfile;
}

export interface TJob {
  id: string;
  title: string;
  description: string;
  requirements: string;
  employmentType: string;
  numberOfPositions: number;
  budget?: number;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
  salary?: number;
  status: string;
}

export interface TBusinessDetails {
  jobs: TJob[];
  user: TUser;
  companyName?: string | null;
  description?: string | null;
  industry?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  website?: string | null;
  employeeCount?: number | null;
  yearFounded?: number | null;
  postedJobs?: number;
  logoUrl?: string | null;
  createdAt: Date;
}

export interface CompleteUser extends TUser {
  workerProfile?: TWorkerProfile;
  businessProfile?: TBusinessProfile;
}

export enum OnboardingStepWorkerProfile {
  PERSONAL_INFO = 'PERSONAL_INFO',
  PROFESSIONAL_INFO = 'PROFESSIONAL_INFO',
  EDUCATIONAL_INFO = 'EDUCATIONAL_INFO',
  REVIEW = 'REVIEW',
  COMPLETED = 'COMPLETED',
}

export enum OnboardingStepBusinessProfile {
  COMPANY_INFO = 'COMPANY_INFO',
  BUSINESS_DETAILS = 'BUSINESS_DETAILS',
  REVIEW = 'REVIEW',
  COMPLETED = 'COMPLETED',
}

export enum Role {
  WORKER = 'WORKER',
  BUSINESS = 'BUSINESS',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  DEVELOPER = 'DEVELOPER',
}

export enum OAuthProvider {
  GOOGLE = 'GOOGLE',
  OUTLOOK = 'OUTLOOK',
  FACEBOOK = 'FACEBOOK',
  GITHUB = 'GITHUB',
  EMAIL_PASSWORD = 'EMAIL_PASSWORD',
}

export interface AuthResponse {
  user: CompleteUser;
  token: string;
}
