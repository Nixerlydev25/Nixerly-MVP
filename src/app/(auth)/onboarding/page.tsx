"use client";

import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingStep } from "@/types/onboarding";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { PersonalInfo } from "./_components/PersonalInfo";
import { ROUTES } from "@/lib/routes";
import { ProfessionalInfo } from "./_components/ProfessionalInfo";
import { EducationalInfo } from "./_components/EducationalInfo";
import { Review } from "./_components/Review";
import { OnboardingSchema, onboardingSchema } from "@/schema/onboarding/onboarding.schema";
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation";
import { useUpdateUser } from "@/hook/user/user.hooks";

type StepComponents = {
  [key in OnboardingStep]: React.ComponentType;
};

export default function OnboardingPage() {
  // Create a properly typed resolver to avoid TypeScript errors
  const typedResolver = zodResolver(onboardingSchema) as Resolver<OnboardingSchema>;
  
  const form = useForm<OnboardingSchema>({
    resolver: typedResolver,
    defaultValues: {
      name: "",
      location: "",
      howDidYouHearAboutUs: "",
      title: "",
      hourlyRate: 0,
      categoryId: "",
      skills: [],
      experienceLevel: "",
      description: "",
      educationLevel: "",
      languages: [],
      availability: true,
    },
  });

  const { currentStep } = useOnboardingNavigation();
  const { mutateAsync: updateUser } = useUpdateUser();
  const router = useRouter();

  const onSubmit: SubmitHandler<OnboardingSchema> = async (data) => {
    try {
      // Create worker profile data
      const workerProfileData = {
        title: data.title,
        hourlyRate: Number(data.hourlyRate),
        description: data.description,
        categoryId: data.categoryId,
        skills: data.skills,
        location: data.location,
        languages: data.languages,
        availability: data.availability,
      };

      // Update user data
      const userData = {
        name: data.name,
        howDidYouHearAboutUs: data.howDidYouHearAboutUs,
        educationLevel: data.educationLevel,
        experienceLevel: data.experienceLevel,
        isOnboardingComplete: true,
      };

      // Combine both updates
      const result = await updateUser({
        ...userData,
        workerProfile: workerProfileData,
      });

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
    [OnboardingStep.PERSONAL_INFO]: PersonalInfo,
    [OnboardingStep.PROFESSIONAL_INFO]: ProfessionalInfo,
    [OnboardingStep.EDUCATIONAL_INFO]: EducationalInfo,
    [OnboardingStep.REVIEW]: Review,
  };

  const CurrentComponent = AllSteps[currentStep];

  return (
    <div className="container max-w-2xl mx-auto py-10">
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
    </div>
  );
}
