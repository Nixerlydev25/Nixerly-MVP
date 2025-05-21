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
    <Card className="p-10 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
      <h2 className="text-3xl font-semibold mb-8 text-nixerly-darkblue">
        Availability
      </h2>
      <div className="space-y-8">
        <FormField
          control={control}
          name="availability"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-4">
              <FormControl>
                <Switch
                  id="availability"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel
                htmlFor="availability"
                className="text-lg text-nixerly-darkgray font-medium"
              >
                I am currently available for work
              </FormLabel>
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-8">
          <Button
            type="button"
            onClick={handleContinue}
            className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-10 py-3 h-12 text-base font-medium shadow-nixerly-button transition-all duration-200 cursor-pointer"
          >
            Continue to Profile
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
