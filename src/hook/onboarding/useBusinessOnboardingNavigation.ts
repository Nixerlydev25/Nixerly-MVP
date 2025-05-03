import { create } from "zustand";
import { BusinessOnboardingStep } from "@/schema/onboarding/business-onboarding.schema";

type BusinessOnboardingStore = {
  currentStep: BusinessOnboardingStep;
  setStep: (step: BusinessOnboardingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const getNextStep = (currentStep: BusinessOnboardingStep): BusinessOnboardingStep => {
  switch (currentStep) {
    case BusinessOnboardingStep.COMPANY_INFO:
      return BusinessOnboardingStep.BUSINESS_DETAILS;
    case BusinessOnboardingStep.BUSINESS_DETAILS:
      return BusinessOnboardingStep.REVIEW;
    default:
      return currentStep;
  }
};

const getPrevStep = (currentStep: BusinessOnboardingStep): BusinessOnboardingStep => {
  switch (currentStep) {
    case BusinessOnboardingStep.BUSINESS_DETAILS:
      return BusinessOnboardingStep.COMPANY_INFO;
    case BusinessOnboardingStep.REVIEW:
      return BusinessOnboardingStep.BUSINESS_DETAILS;
    default:
      return currentStep;
  }
};

const useBusinessOnboardingNavigationStore = create<BusinessOnboardingStore>((set) => ({
  currentStep: BusinessOnboardingStep.COMPANY_INFO,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () =>
    set((state) => ({ currentStep: getNextStep(state.currentStep) })),
  prevStep: () =>
    set((state) => ({ currentStep: getPrevStep(state.currentStep) })),
}));

export const useBusinessOnboardingNavigation = () => {
  return useBusinessOnboardingNavigationStore();
}; 