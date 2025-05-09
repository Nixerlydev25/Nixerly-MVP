import { ONBOARDING_STEPS_BUSINESS, OnboardingStepBusiness } from "@/types/onboarding";
import { useRouter, useSearchParams } from "next/navigation";

export const useBusinessOnboardingNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentStep = searchParams.get("onboarding-step") as OnboardingStepBusiness || OnboardingStepBusiness.COMPANY_INFO;
  const currentStepIndex = ONBOARDING_STEPS_BUSINESS.indexOf(currentStep);
  
  const navigateToStep = (step: OnboardingStepBusiness) => {
    const url = new URL(window.location.href);
    url.searchParams.set("onboarding-step", step);
    router.push(url.pathname + url.search);
  };
  
  const nextStep = () => {
    if (currentStepIndex < ONBOARDING_STEPS_BUSINESS.length - 1) {
      navigateToStep(ONBOARDING_STEPS_BUSINESS[currentStepIndex + 1]);
    }
  };
  
  const prevStep = () => {
    if (currentStepIndex > 0) {
      navigateToStep(ONBOARDING_STEPS_BUSINESS[currentStepIndex - 1]);
    }
  };
  
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === ONBOARDING_STEPS_BUSINESS.length - 1;
  
  return {
    currentStep,
    currentStepIndex,
    navigateToStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
  };
}; 