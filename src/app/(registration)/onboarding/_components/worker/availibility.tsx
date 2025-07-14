import React from "react";
import { useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation";
import { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema";
import { ChevronRight } from "lucide-react";
import { OnboardingStepWorkerProfileB } from "@/types/onboarding";
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks";
import { ROUTES } from "@/lib/routes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ProgressIndicator } from "../progress-indicator"

export function AvailabilityInfo() {
  const { goToNextStep } = useOnboardingNavigation();
  const { mutateAsync: updateWorkerProfile } = useUpdateWorkerProfile();
  const { watch, trigger, control } = useFormContext<WorkerOnboardingSchema>();

  const router = useRouter();

  const formData = watch();

  const handleContinue = async () => {
    const fieldsToValidate = ["availability"] as const;
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      await updateWorkerProfile({
        availability: formData.availability,
        onboardingStep: OnboardingStepWorkerProfileB.COMPLETED
      }, {
        onSuccess() {
          router.replace(ROUTES.FEED);
          toast.success("Onboarding completed successfully!");
        },
      });
    }
    goToNextStep();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ProgressIndicator currentStep={4} totalSteps={4} hasStartedFilling={Boolean(formData.availability !== undefined)} />
      <Card className="border border-gray-300 bg-white text-nixerly-businesslabel animate-fade-in py-0 gap-0">
      <div className="gap-5 flex border-b border-gray-300 px-6 py-4">
        <div className="flex items-center justify-center h-10 w-10  md:w-14 md:h-14 border border-gray-300 rounded-full">
            <span className="text-lg sm:text-base font-medium">04</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold my-1 text-nixerly-blue">Availability</h2>
            <p className="text-nixerly-darkgray text-base">Please Provide The Following Information To Get Started</p>
          </div>
        </div>

      <div className="space-y-8 px-6 py-4">
        <FormField
          control={control}
          name="availability"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-4 p-6">
              <FormControl>
                <Switch id="availability" checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel htmlFor="availability" className="text-lg font-semibold text-[#0E121B]">
                I am Currently Available for Work
              </FormLabel>
            </FormItem>
          )}
        />
    </div>
        <div className="flex justify-end border-t border-gray-300 px-6 py-4">
          <Button
            type="button"
            onClick={handleContinue}
            className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-8 py-3 h-12 rounded-full text-base font-medium shadow-nixerly-button transition-all duration-200 cursor-pointer"
          >
            Continue To Profile
          </Button>
        </div>
  
    </Card>
    </div>
  );
}
