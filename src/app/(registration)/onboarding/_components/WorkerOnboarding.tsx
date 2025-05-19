"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingStepWorker } from "@/types/onboarding";
import { Form } from "@/components/ui/form";
import {
  PersonalInfo,
  SkillsInfo,
  AvailabilityInfo,
  LanguagesInfo,
  ExperienceInfo,
  EducationInfo,
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
      // Professional Info
      title: "Licensed Plumber for Residential & Commercial Projects",
      hourlyRate: 35,
      description:
        "Looking for reliable plumbing services? I'm a licensed plumber with 6+ years of hands-on experience in leak repairs, pipe installations, water heater replacements, and bathroom renovations. I handle both residential and commercial projects with professionalism and efficiency. Emergency services available. Quality work, guaranteed satisfaction.",
      skills: [
        "PIPE_INSTALLATION",
        "LEAK_REPAIR",
        "WATER_HEATER_REPLACEMENT",
        "BUILDING_INSPECTION",
        "BATHROOM_RENOVATION",
      ],
      experienceLevel: "INTERMEDIATE",
      availability: true,
      location: "New York",
      city: "New York City",
      state: "NY",
      country: "USA",
      languages: [
        { name: "ENGLISH", proficiency: "FLUENT" },
        // { name: "SPANISH", proficiency: "CONVERSATIONAL" },
      ],

      // // Experience
      experience: [
        {
          title: "Senior Plumber",
          company: "ABC Plumbing Services",
          location: "New York",
          country: "USA",
          city: "New York City",
          state: "NY",
          startDate: new Date("2020-01-01"),
          endDate: new Date(),
          description:
            "Led multiple residential and commercial plumbing projects including repiping, leak detection, and fixture installations. Trained junior plumbers and ensured compliance with local plumbing codes.",
          current: true,
        },
        {
          title: "Junior Plumber",
          company: "QuickFix Plumbing",
          location: "New York",
          country: "USA",
          city: "Brooklyn",
          state: "NY",
          startDate: new Date("2017-06-01"),
          endDate: new Date("2019-12-01"),
          description:
            "Assisted in pipe installations, drainage maintenance, and repair tasks under senior supervision. Developed expertise in residential service calls and emergency repairs.",
          current: false,
        },
      ],

      // Education
      education: [
        {
          school: "New York Technical Institute",
          degree: "Associate",
          fieldOfStudy: "Plumbing Technology",
          startDate: new Date("2018-09-01"),
          endDate: new Date("2020-05-01"),
          description:
            "Completed a comprehensive program in plumbing systems, building codes, and safety standards. Gained hands-on training in modern plumbing techniques.",
          currentlyStudying: false,
        },
      ],
    },
  });

  const { currentStep } = useOnboardingNavigation();

  const AllSteps: StepComponents = {
    [OnboardingStepWorker.PERSONAL_INFO]: PersonalInfo,
    [OnboardingStepWorker.SKILLS_HOURLY_RATE_INFO]: SkillsInfo,
    [OnboardingStepWorker.LANGUAGE_INFO]: LanguagesInfo,
    [OnboardingStepWorker.EXPERIENCE_INFO]: ExperienceInfo,
    [OnboardingStepWorker.EDUCATION_INFO]: EducationInfo,
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
