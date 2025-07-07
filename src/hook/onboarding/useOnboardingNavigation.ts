import { useRouter, useSearchParams } from "next/navigation";
import {
  ONBOARDING_STEPS_WORKER,
  OnboardingStepWorker,
} from "../../types/onboarding";

export const useOnboardingNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStep =
    (searchParams.get("onboarding-step") as OnboardingStepWorker) ||
    OnboardingStepWorker.PERSONAL_INFO;
  const currentStepIndex = ONBOARDING_STEPS_WORKER.indexOf(currentStep);

  const navigateToStep = (step: OnboardingStepWorker) => {
    const url = new URL(window.location.href);
    url.searchParams.set("onboarding-step", step);
    router.push(url.pathname + url.search);
  };

  const goToNextStep = () => {
    if (currentStepIndex < ONBOARDING_STEPS_WORKER.length - 1) {
      navigateToStep(ONBOARDING_STEPS_WORKER[currentStepIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      navigateToStep(ONBOARDING_STEPS_WORKER[currentStepIndex - 1]);
    }
  };

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === ONBOARDING_STEPS_WORKER.length - 1;

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
