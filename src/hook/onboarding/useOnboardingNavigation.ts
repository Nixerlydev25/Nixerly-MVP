import { useRouter, useSearchParams } from "next/navigation";
import { ONBOARDING_STEPS, OnboardingStep } from "../../types/onboarding";

export const useOnboardingNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentStep = searchParams.get("onboardingStep") as OnboardingStep || OnboardingStep.PERSONAL_INFO;
  const currentStepIndex = ONBOARDING_STEPS.indexOf(currentStep);
  
  const navigateToStep = (step: OnboardingStep) => {
    const url = new URL(window.location.href);
    url.searchParams.set("onboardingStep", step);
    router.push(url.pathname + url.search);
  };
  
  const goToNextStep = () => {
    if (currentStepIndex < ONBOARDING_STEPS.length - 1) {
      navigateToStep(ONBOARDING_STEPS[currentStepIndex + 1]);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      navigateToStep(ONBOARDING_STEPS[currentStepIndex - 1]);
    }
  };
  
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === ONBOARDING_STEPS.length - 1;
  
  return {
    currentStep,
    currentStepIndex,
    navigateToStep,
    goToNextStep,
    goToPreviousStep,
    isFirstStep,
    isLastStep,
  };
}; 