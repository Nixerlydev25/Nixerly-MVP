export enum OnboardingStepWorker {
  PERSONAL_INFO = "personal-info",
  LANGUAGE_INFO = "language-info",
  SKILLS_HOURLY_RATE_INFO = "skills-hourly-rate-info",
  PROFESSIONAL_INFO = "professional-info",
  AVAILABILITY_INFO = "availability-info",
}

export const ONBOARDING_STEPS_WORKER = [
  OnboardingStepWorker.PERSONAL_INFO,
  OnboardingStepWorker.SKILLS_HOURLY_RATE_INFO,
  OnboardingStepWorker.PROFESSIONAL_INFO,
  OnboardingStepWorker.LANGUAGE_INFO,
  OnboardingStepWorker.AVAILABILITY_INFO,
]; 

export enum OnboardingStepWorkerProfileB {
  PERSONAL_INFO="PERSONAL_INFO",
  LANGUAGE_INFO="LANGUAGE_INFO",
  SKILLS_HOURLY_RATE_INFO="SKILLS_HOURLY_RATE_INFO",
  PROFESSIONAL_INFO="PROFESSIONAL_INFO",
  EDUCATIONAL_INFO="EDUCATIONAL_INFO",
  COMPLETED="COMPLETED"
}


export enum OnboardingStepBusiness {
  COMPANY_INFO = "company-info",
  // BUSINESS_DETAILS = "business-details",
  // REVIEW = "review",
  // COMPLETED = "completed"
}

export const ONBOARDING_STEPS_BUSINESS = [
  OnboardingStepBusiness.COMPANY_INFO,
  // OnboardingStepBusiness.BUSINESS_DETAILS,
  // OnboardingStepBusiness.REVIEW,
  // OnboardingStepBusiness.COMPLETED,
];


export enum OnboardingStepBusinessProfileB {
  COMPANY_INFO="COMPANY_INFO",
  // BUSINESS_DETAILS="BUSINESS_DETAILS",
  // REVIEW="REVIEW",
  COMPLETED="COMPLETED"
}
