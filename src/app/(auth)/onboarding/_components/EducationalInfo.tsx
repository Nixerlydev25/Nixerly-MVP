import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation";
import { OnboardingSchema, onboardingOptions } from "@/schema/onboarding/onboarding.schema";
import { useUpdateUser } from "@/hook/user/user.hooks";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export const EducationalInfo = () => {
  const { control, watch, trigger } = useFormContext<OnboardingSchema>();
  const { goToNextStep, goToPreviousStep } = useOnboardingNavigation();
  const { mutateAsync: updateUser } = useUpdateUser();

  const formData = watch();
  const languages = watch("languages") || [];

  const [tempLanguage, setTempLanguage] = useState<string | null>(null);

  const handleContinue = async () => {
    const fieldsToValidate = [
      "educationLevel",
      "languages",
      "availability",
    ] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      await updateUser({
        educationLevel: formData.educationLevel,
        workerProfile: {
          languages: formData.languages,
          availability: formData.availability,
        }
      });
      goToNextStep();
    }
  };

  const handleAddLanguage = (language: string, proficiency: string) => {
    const currentLanguages = formData.languages || [];
    if (!currentLanguages.some(l => l.language === language)) {
      const updatedLanguages = [
        ...currentLanguages,
        { language, proficiency }
      ];
      control._formValues.languages = updatedLanguages;
      trigger("languages");
    }
  };

  return (
    <Card className="p-8 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-nixerly-darkblue">Educational Background</h2>
      <div className="space-y-7">
        <FormField
          control={control}
          name="educationLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-nixerly-darkgray font-medium">Highest Education Level</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g. Bachelor's Degree, High School Diploma" 
                  {...field} 
                  className="py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20"
                />
              </FormControl>
              <FormMessage className="text-nixerly-coral" />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel className="text-nixerly-darkgray font-medium">Languages</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            <Select
              onValueChange={(language) => {
                setTempLanguage(language);
              }}
            >
              <SelectTrigger className="py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {onboardingOptions.languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(proficiency) => {
                if (tempLanguage) {
                  handleAddLanguage(tempLanguage, proficiency);
                  setTempLanguage(null);
                }
              }}
            >
              <SelectTrigger className="py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20">
                <SelectValue placeholder="Select proficiency" />
              </SelectTrigger>
              <SelectContent>
                {onboardingOptions.proficiencyLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {languages.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {languages.map((langItem, index) => {
                const languageObj = onboardingOptions.languages.find(l => l.value === langItem.language);
                const proficiencyObj = onboardingOptions.proficiencyLevels.find(p => p.value === langItem.proficiency);
                
                return (
                  <div 
                    key={index} 
                    className="bg-nixerly-ultralightblue border border-nixerly-lightblue text-nixerly-darkblue px-3 py-1.5 rounded-md flex items-center gap-2"
                  >
                    <span>
                      {languageObj?.label || langItem.language} ({proficiencyObj?.label || langItem.proficiency})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newLanguages = [...languages];
                        newLanguages.splice(index, 1);
                        control._formValues.languages = newLanguages;
                        trigger("languages");
                      }}
                      className="text-nixerly-darkblue hover:text-nixerly-coral transition-colors"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          <FormMessage className="text-nixerly-coral" />
        </div>

        <FormField
          control={control}
          name="availability"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-nixerly-lightblue p-4 bg-nixerly-ultralightblue/50">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-nixerly-blue data-[state=checked]:bg-nixerly-blue data-[state=checked]:text-white"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-nixerly-darkgray font-medium">
                  Available for Work
                </FormLabel>
                <p className="text-sm text-nixerly-darkgray/70">
                  Check this if you are currently available to take on new work
                </p>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={goToPreviousStep}
            className="border-nixerly-lightblue hover:bg-nixerly-ultralightblue text-nixerly-darkblue transition-colors"
          >
            Previous
          </Button>
          <Button 
            type="button" 
            onClick={handleContinue}
            className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-8 py-2.5 shadow-nixerly-button transition-all duration-200"
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};
