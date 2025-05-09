"use client";

import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OnboardingStepWorker,
  OnboardingStepWorkerProfileB,
} from "@/types/onboarding";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import {
  PersonalInfo,
  ProfessionalInfo,
  SkillsInfo,
  HourlyRateInfo,
  AvailabilityInfo,
} from "./worker";
import {
  WorkerOnboardingSchema,
  workerOnboardingSchema,
} from "@/schema/onboarding/worker-onboarding.schema";
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation";
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks";
import { TWorkerProfile } from "@/types/auth";
import LanguageInfo from "./worker/languages";

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
      description: "Need reliable plumbing help? I'm a licensed plumber with over 5 years of experience handling everything from leak repairs and pipe installations to bathroom remodeling and emergency services. Whether it's a clogged drain or a full repiping job, I deliver fast, affordable, and high-quality work. Available for both residential and commercial projects. Satisfaction guaranteed."
    }
  });

  console.log('formdata',form.watch())

  const { currentStep } = useOnboardingNavigation();
  const router = useRouter();
  const { mutateAsync: updateWorkerProfile } = useUpdateWorkerProfile();

  const onSubmit: SubmitHandler<WorkerOnboardingSchema> = async (data) => {
    try {
      // Create worker profile data
      const workerProfileData = {
        availability: data.availability,
        onboardingStep: OnboardingStepWorkerProfileB.COMPLETED,
      } as Partial<TWorkerProfile>;

      // Update worker profile
      const result = await updateWorkerProfile(workerProfileData);

      if (result) {
        router.replace(ROUTES.FEED);
        toast.success("Onboarding completed successfully!");
      }

    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to complete onboarding";
      toast.error(errorMessage);
    }
  };

  const AllSteps: StepComponents = {
    [OnboardingStepWorker.PERSONAL_INFO]: PersonalInfo,
    [OnboardingStepWorker.LANGUAGE_INFO]: LanguageInfo,
    [OnboardingStepWorker.SKILLS_INFO]: SkillsInfo,
    [OnboardingStepWorker.HOURLY_RATE_INFO]: HourlyRateInfo,
    [OnboardingStepWorker.PROFESSIONAL_INFO]: ProfessionalInfo,
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CurrentComponent />
        </form>
      </Form>
    </div>
  );
}
