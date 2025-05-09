"use client";

import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingStepWorker } from "@/types/onboarding";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import {
  PersonalInfo,
  ProfessionalInfo,
} from "./worker";
import {
  WorkerOnboardingSchema,
  workerOnboardingSchema,
} from "@/schema/onboarding/worker-onboarding.schema";
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation";
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks";
import { TWorkerProfile } from "@/types/auth";
import LanguageInfo from "./worker/languages";
import SkillsInfo from "./worker/skill";
import HourlyRateInfo from "./worker/hourlyRate";
import AvailabilityInfo from "./worker/availibility";

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
      location: "",
      title: "",
      hourlyRate: 0,
      category: "PLUMBING",
      skills: [],
      description: "",
      languages: [],
      availability: true,
      experience: [],
      education: [],
    },
  });

  const { currentStep } = useOnboardingNavigation(); // professional-info
  const { mutateAsync: updateWorkerProfile } = useUpdateWorkerProfile();
  const router = useRouter();

  const onSubmit: SubmitHandler<WorkerOnboardingSchema> = async (data) => {
    try {
      // Create worker profile data
      const workerProfileData = {
        title: data.title,
        hourlyRate: Number(data.hourlyRate),
        description: data.description,
        categoryId: data.category,
        skills: data.skills,
        location: data.location,
        languages: data.languages,
        availability: data.availability,
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
    [OnboardingStepWorker.AVAILABILITY_INFO] : AvailabilityInfo
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
