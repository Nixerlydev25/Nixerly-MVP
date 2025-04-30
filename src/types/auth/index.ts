export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

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
