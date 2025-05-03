"use client";

import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { useUpdateUser } from "@/hook/user/user.hooks";
import { 
  BusinessOnboardingStep,
  BusinessOnboardingSchema, 
  businessOnboardingSchema 
} from "@/schema/onboarding/business-onboarding.schema";
import { useBusinessOnboardingNavigation } from "@/hook/onboarding/useBusinessOnboardingNavigation";
import { CompanyInfo, BusinessDetails, Review } from "./business";

type StepComponents = {
  [key in BusinessOnboardingStep]: React.ComponentType;
};

export function BusinessOnboarding() {
  // Create a properly typed resolver to avoid TypeScript errors
  const typedResolver = zodResolver(
    businessOnboardingSchema
  ) as Resolver<BusinessOnboardingSchema>;

  const form = useForm<BusinessOnboardingSchema>({
    resolver: typedResolver,
    defaultValues: {
      companyName: "",
      description: "",
      industry: "",
      location: "",
      website: "",
      employeeCount: 1,
      yearFounded: new Date().getFullYear(),
    },
  });

  const { currentStep } = useBusinessOnboardingNavigation();
  const { mutateAsync: updateUser } = useUpdateUser();
  const router = useRouter();

  const onSubmit: SubmitHandler<BusinessOnboardingSchema> = async (data) => {
    try {
      // Create business profile data
      const businessProfileData = {
        companyName: data.companyName,
        description: data.description,
        industry: data.industry,
        location: data.location,
        website: data.website || null,
        employeeCount: data.employeeCount,
        yearFounded: data.yearFounded,
      };

      // Update user data
      const result = await updateUser({
        isOnboardingComplete: true,
        businessProfile: businessProfileData,
      });

      if (result) {
        router.replace(ROUTES.FEED);
        toast.success("Business onboarding completed successfully!");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to complete business onboarding";
      toast.error(errorMessage);
    }
  };

  const AllSteps: StepComponents = {
    [BusinessOnboardingStep.COMPANY_INFO]: CompanyInfo,
    [BusinessOnboardingStep.BUSINESS_DETAILS]: BusinessDetails,
    [BusinessOnboardingStep.REVIEW]: Review,
  };

  const CurrentComponent = AllSteps[currentStep];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Complete Your Business Profile</h1>
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