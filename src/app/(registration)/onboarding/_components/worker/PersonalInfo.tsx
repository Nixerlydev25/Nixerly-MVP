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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation";
import { OnboardingSchema, onboardingOptions } from "@/schema/onboarding/onboarding.schema";
import { useUpdateUser } from "@/hook/user/user.hooks";

export const PersonalInfo = () => {
  const { control, trigger, watch } = useFormContext<OnboardingSchema>();
  const { goToNextStep } = useOnboardingNavigation();
  const formData = watch();
  const { mutateAsync: updateUser } = useUpdateUser();

  const handleContinue = async () => {
    const fieldsToValidate = [
      "name",
      "location", 
      "howDidYouHearAboutUs",
    ] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      await updateUser({
        name: formData.name,
        howDidYouHearAboutUs: formData.howDidYouHearAboutUs,
        workerProfile: {
          location: formData.location,
        }
      });
      goToNextStep();
    }
  };

  return (
    <Card className="p-10 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
      <h2 className="text-3xl font-semibold mb-8 text-nixerly-darkblue">Personal Information</h2>
      <div className="space-y-8">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">Full Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your full name" 
                  {...field} 
                  className="w-full h-12 py-3 px-4 text-base focus:border-nixerly-blue focus:ring-nixerly-blue/20" 
                />
              </FormControl>
              <FormDescription className="text-sm text-nixerly-darkgray/50 mt-2">
                Enter your legal full name as it appears on official documents
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
                <Input 
                  placeholder="City, State, Country" 
                  {...field} 
                  className="w-full h-12 py-3 px-4 text-base focus:border-nixerly-blue focus:ring-nixerly-blue/20" 
                />
              </FormControl>
              <FormDescription className="text-sm text-nixerly-darkgray/50 mt-2">
                Enter your current city, state and country of residence
              </FormDescription>
              <FormMessage className="text-nixerly-coral mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="howDidYouHearAboutUs"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">How did you hear about us?</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full h-12 py-3 px-4 text-base focus:border-nixerly-blue focus:ring-nixerly-blue/20">
                    <SelectValue placeholder="Select how you found us" />
                  </SelectTrigger>
                  <SelectContent>
                    {onboardingOptions.referralSources.map((source) => (
                      <SelectItem 
                        key={source.value} 
                        value={source.value}
                        className="py-3"
                      >
                        {source.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="text-sm text-nixerly-darkgray/50 mt-2">
                Help us understand how you discovered our platform
              </FormDescription>
              <FormMessage className="text-nixerly-coral mt-1" />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-8">
          <Button 
            type="button" 
            onClick={handleContinue}
            className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-10 py-3 h-12 text-base font-medium shadow-nixerly-button transition-all duration-200"
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};
