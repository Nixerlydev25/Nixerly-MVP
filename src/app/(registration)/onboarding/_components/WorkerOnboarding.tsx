"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OnboardingStepWorker,
} from "@/types/onboarding";
import { Form } from "@/components/ui/form";
import {
  PersonalInfo,
  SkillsInfo,
  AvailabilityInfo,
  LanguagesInfo,
  ExperienceInfo,
  EducationInfo
} from "./worker";
import {
  WorkerOnboardingSchema,
  workerOnboardingSchema,
} from "@/schema/onboarding/worker-onboarding.schema";
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation";

type StepComponents = {
  [key in OnboardingStepWorker]: React.ComponentType;
};

export function WorkerOnboarding() {
  // Create a properly typed resolver to avoid TypeScript errors
  const typedResolver = zodResolver(
    workerOnboardingSchema
  ) as Resolver<WorkerOnboardingSchema>;

  const form = useForm<WorkerOnboardingSchema>({
    resolver: typedResolver,
    defaultValues: {
      title: 'Experienced Plumber for Residential and Commercial Services',
      description: "Need reliable plumbing help? I'm a licensed plumber with over 5 years of experience handling everything from leak repairs and pipe installations to bathroom remodeling and emergency services. Whether it's a clogged drain or a full repiping job, I deliver fast, affordable, and high-quality work. Available for both residential and commercial projects. Satisfaction guaranteed.",
      languages: [{ name: "ENGLISH", proficiency: "BASIC" }]
    }
  });

  const { currentStep } = useOnboardingNavigation();

  const AllSteps: StepComponents = {
    [OnboardingStepWorker.PERSONAL_INFO]: PersonalInfo,
    [OnboardingStepWorker.SKILLS_HOURLY_RATE_INFO]: SkillsInfo,
    [OnboardingStepWorker.LANGUAGE_INFO]: LanguagesInfo,
    [OnboardingStepWorker.EXPERIENCE_INFO]: ExperienceInfo,
    [OnboardingStepWorker.EDUCATION_INFO] : EducationInfo,
    [OnboardingStepWorker.AVAILABILITY_INFO]: AvailabilityInfo,
  };

  const CurrentComponent = AllSteps[currentStep];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Complete Your Worker Profile</h1>
        <p className="text-muted-foreground">
          Please provide the following information to get started
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          <CurrentComponent />
        </form>
      </Form>
    </div>
  );
}
