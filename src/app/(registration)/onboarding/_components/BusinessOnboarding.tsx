"use client";

import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useUpdateBusinessProfile } from "@/hook/user/user.hooks";
import {
  BusinessOnboardingSchema,
  businessOnboardingSchema,
} from "@/schema/onboarding/business-onboarding.schema";
import { useBusinessOnboardingNavigation } from "@/hook/onboarding/useBusinessOnboardingNavigation";
import { BusinessProfileForm } from "./business";
import {
  OnboardingStepBusiness,
  OnboardingStepBusinessProfileB,
} from "@/types/onboarding";

type StepComponents = {
  [key in OnboardingStepBusiness]: React.ComponentType;
};

export function BusinessOnboarding() {
  // Create a properly typed resolver to avoid TypeScript errors
  const typedResolver = zodResolver(
    businessOnboardingSchema
  ) as Resolver<BusinessOnboardingSchema>;

  const form = useForm<BusinessOnboardingSchema>({
    resolver: typedResolver,
    // defaultValues: {
    //   companyName: "",
    //   description:
    //     "Need reliable plumbing help? I'm a licensed plumber with over 5 years of experience handling everything from leak repairs and pipe installations to bathroom remodeling and emergency services. Whether it's a clogged drain or a full repiping job, I deliver fast, affordable, and high-quality work. Available for both residential and commercial projects. Satisfaction guaranteed.",
    //   industry: undefined,
    //   city: "",
    //   state: "",
    //   country: "",
    //   website: "",
    //   employeeCount: undefined,
    //   yearFounded: new Date().getFullYear(),
    // },
  });

  const { currentStep } = useBusinessOnboardingNavigation();
  const { mutateAsync: updateBusinessUser } = useUpdateBusinessProfile(false);
  // const router = useRouter();

  const onSubmit: SubmitHandler<BusinessOnboardingSchema> = async (data) => {
    try {
      // Create business profile data
      const getEmployeeCountNumber = (range: string): number => {
        const [min] = range.split("-");
        return parseInt(min, 10);
      };

      const businessProfileData = {
        companyName: data.companyName,
        description: data.description,
        industry: data.industry,
        city: data.city,
        country: data.country,
        state: data.state,
        website: data.website || null,
        employeeCount:
          data.employeeCount === "100+"
            ? 100
            : getEmployeeCountNumber(data.employeeCount),
        yearFounded: data.yearFounded,
        onboardingStep: OnboardingStepBusinessProfileB.COMPLETED,
      };

      console.log(businessProfileData, "businessProfileData");

      // Update user data
      await updateBusinessUser(businessProfileData);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to complete business onboarding";
      toast.error(errorMessage);
    }
  };

  const AllSteps: StepComponents = {
    [OnboardingStepBusiness.COMPANY_INFO]: BusinessProfileForm,
    // [OnboardingStepBusiness.BUSINESS_DETAILS]: BusinessDetails,
    // [OnboardingStepBusiness.REVIEW]: Review,
  };

  const CurrentComponent = AllSteps[currentStep];

  console.log(form.formState.errors);

  return (
    <div className="py-8">
      {/* <div>
        <h1 className="text-2xl font-bold">Complete Your Business Profile</h1>
        <p className="text-muted-foreground">
          Please provide the following information to get started
        </p>
      </div> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CurrentComponent />
        </form>
      </Form>
    </div>
  );
}
