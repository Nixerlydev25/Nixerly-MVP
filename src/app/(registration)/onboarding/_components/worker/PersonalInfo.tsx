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
import { PhoneInputComponent } from "@/components/common/phone-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const PersonalInfo = () => {
  const { goToNextStep } = useOnboardingNavigation();
  const { control, watch, trigger, setValue, formState: { errors } } = useFormContext<WorkerOnboardingSchema>();
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
      "phoneNumber",
      "employmentType",
    ] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      const { title, description, city, state, country, phoneNumber, employmentType } = formData;
      
      const workerProfileData = {
        title,
        description,
        city,
        state,
        country,
        phoneNumber,
        employmentType,
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
          name="employmentType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">Employment Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="SELF_EMPLOYED" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Self Employed
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="PAYEE" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      PAYEE
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Select your employment type
              </FormDescription>
              <FormMessage className="text-nixerly-coral mt-1" />
            </FormItem>
          )}
        />

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
              <FormDescription>
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
              <FormDescription>
                Provide a detailed description of your professional background and services
              </FormDescription>
              <FormMessage className="text-nixerly-coral mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">Phone Number</FormLabel>
              <FormControl>
                <PhoneInputComponent 
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.phoneNumber?.message}
                  required
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                Enter your contact phone number
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
              <FormDescription>
                Search and select your location
              </FormDescription>
              {(errors.city || errors.country) && (
                <p className="text-nixerly-coral mt-1 text-sm">
                  Location is required
                </p>
              )}
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-8">
        <Button
            type="button"
            onClick={handleContinue}
            disabled={isPending}
            className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-10 py-3 h-12 text-base font-medium shadow-nixerly-button transition-all duration-200 cursor-pointer"
          >
            {isPending ? "Saving..." : "Continue"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
