import { ProfileType } from "../user/user.types";

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

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
  howDidYouHearAboutUs?: string;
  experienceLevel?: string;
  educationLevel?: string;
  isOnboardingComplete?: boolean;
  defaultProfile: string;
  profileType?: "WORKER" | "BUSINESS";
  workerProfile?: WorkerProfile;
}

export interface WorkerProfile {
  title?: string;
  hourlyRate?: number;
  description?: string;
  categoryId?: string;
  skills?: string[] | string;
  location?: string;
  languages?: LanguageProficiency[] | string;
  availability?: boolean;
}

export interface LanguageProficiency {
  language: string;
  proficiency: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
