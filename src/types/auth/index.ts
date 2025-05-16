import { OnboardingStepBusinessProfileB, OnboardingStepWorkerProfileB } from "../onboarding";
import { ProfileType } from "../user/user.types";
import { WorkerEducation, WorkerExperience, WorkerLanguage } from "../worker.types";

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
}

// Worker Profile type
export interface TWorkerProfile {
  id?: string;
  title?: string | null;
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
  user: TUser
  languages?: WorkerLanguage[] | null;
  profilePicture?: string | null;
  education?: WorkerEducation[] | null;
  experience?: WorkerExperience[] | null;
  onboardingStep?: OnboardingStepWorkerProfileB;
}

// Business Profile type
export interface TBusinessProfile {
  companyName: string | null;
  description: string | null;
  industry: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  website: string | null;
  employeeCount: number | null;
  yearFounded: number | null;
  onboardingStep: OnboardingStepBusinessProfileB;
}

// Complete User type with profiles
export interface CompleteUser extends TUser {
  workerProfile?: TWorkerProfile;
  businessProfile?: TBusinessProfile;
}

export enum OnboardingStepWorkerProfile {
  PERSONAL_INFO = "PERSONAL_INFO",
  PROFESSIONAL_INFO = "PROFESSIONAL_INFO",
  EDUCATIONAL_INFO = "EDUCATIONAL_INFO",
  REVIEW = "REVIEW",
  COMPLETED = "COMPLETED"
}

export enum OnboardingStepBusinessProfile {
  COMPANY_INFO = "COMPANY_INFO",
  BUSINESS_DETAILS = "BUSINESS_DETAILS",
  REVIEW = "REVIEW",
  COMPLETED = "COMPLETED"
}

export enum Role {
  WORKER = "WORKER",
  BUSINESS = "BUSINESS", 
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  DEVELOPER = "DEVELOPER"
}

export enum OAuthProvider {
  GOOGLE = "GOOGLE",
  OUTLOOK = "OUTLOOK",
  FACEBOOK = "FACEBOOK",
  GITHUB = "GITHUB",
  EMAIL_PASSWORD = "EMAIL_PASSWORD"
}

export interface AuthResponse {
  user: CompleteUser;
  token: string;
}
