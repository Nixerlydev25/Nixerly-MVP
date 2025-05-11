import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation";
import { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks";
import { LocationDetails } from "@/components/location-search";
import { LocationSearch } from "@/components/location-search";
import { OnboardingStepWorkerProfileB } from "@/types/onboarding";
import { ChevronRight } from "lucide-react";

export const PersonalInfo = () => {
  const { goToNextStep } = useOnboardingNavigation();
  const { control, watch, trigger, setValue } = useFormContext<WorkerOnboardingSchema>();
  const { mutateAsync: updateWorker, isPending } = useUpdateWorkerProfile();
  const formData = watch();

  const handleLocationSelect = (locationDetails: LocationDetails) => {
    setValue("city", locationDetails.city);
    setValue("state", locationDetails.state);
    setValue("country", locationDetails.country);
  };

  const handleContinue = async () => {
    const fieldsToValidate = [
      "title",
      "description",
      "city",
      "state",
      "country",
    ] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      const { title, description, city, state, country } = formData;
      
      const workerProfileData = {
        title,
        description,
        city,
        state,
        country,
        onboardingStep : OnboardingStepWorkerProfileB.SKILLS_HOURLY_RATE_INFO
      };

      await updateWorker(workerProfileData);
      goToNextStep();
    }
  };

  return (
    <Card className="p-10 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
      <h2 className="text-3xl font-semibold mb-8 text-nixerly-darkblue">Personal Information</h2>
      <div className="space-y-8">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">Professional Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g. Senior Plumber, Master Electrician" 
                  {...field} 
                  className="w-full h-12 py-3 px-4 text-base focus:border-nixerly-blue focus:ring-nixerly-blue/20" 
                />
              </FormControl>
              <FormDescription className="text-sm text-nixerly-darkgray/50 mt-2">
                Enter your professional title that best describes your role
              </FormDescription>
              <FormMessage className="text-nixerly-coral mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">Professional Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your experience, expertise, and the services you offer..." 
                  className="min-h-[120px] py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20" 
                  {...field} 
                />
              </FormControl>
              <FormDescription className="text-sm text-nixerly-darkgray/50 mt-2">
                Provide a detailed description of your professional background and services
              </FormDescription>
              <FormMessage className="text-nixerly-coral mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">Location</FormLabel>
              <FormControl>
                <LocationSearch
                  onLocationSelect={handleLocationSelect}
                  defaultValue={field.value}
                  className="w-full"
                />
              </FormControl>
              <FormDescription className="text-sm text-nixerly-darkgray/50 mt-2">
                Search and select your location
              </FormDescription>
              <FormMessage className="text-nixerly-coral mt-1" />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-8">
        <Button
            type="button"
            onClick={handleContinue}
            disabled={isPending}
            className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-10 py-3 h-12 text-base font-medium shadow-nixerly-button transition-all duration-200"
          >
            {isPending ? "Saving..." : "Continue"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
