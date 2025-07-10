import { useFormContext } from "react-hook-form";
import Image from "next/image";
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
import { OnboardingStepWorkerProfileB } from "@/types/onboarding";
import { ChevronRight, Info, Plus, X } from "lucide-react";
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks";
import { onboardingOptions } from "@/schema/onboarding/worker-onboarding.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateLanguage } from "@/hook/langauge/language.hook";
import { ProgressIndicator } from "../progress-indicator"

export const LanguagesInfo = () => {
  const { goToNextStep } = useOnboardingNavigation();
  const {
    control,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<WorkerOnboardingSchema>();
  const { mutateAsync: updateWorker, isPending } = useUpdateWorkerProfile();
  const { mutateAsync: updateLanguage } = useCreateLanguage();
  const formData = watch();

  const handleContinue = async () => {
    const fieldsToValidate = ["languages"] as const;
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      const { languages } = formData;

      const workerProfileData = {
        onboardingStep: OnboardingStepWorkerProfileB.AVAILABILITY_INFO,
      };
      const workerProfileLanguageData = {
        languages,
      };

      await updateLanguage(workerProfileLanguageData, {
        async onSuccess() {
          await updateWorker(workerProfileData);
        },
      });
      await updateWorker(workerProfileData);
      goToNextStep();
    }
  };

  const handleAddLanguage = () => {
    const currentLanguages = formData.languages || [];
    if (currentLanguages.length < 4) {
      setValue("languages", [
        ...currentLanguages,
        { name: "", proficiency: "BASIC" },
      ]);
    }
  };

  const handleRemoveLanguage = (index: number) => {
    const currentLanguages = formData.languages || [];
    setValue(
      "languages",
      currentLanguages.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ProgressIndicator currentStep={3} totalSteps={4} hasStartedFilling={Boolean(formData.languages && formData.languages.length > 0)} />
      <Card className="shadow-nixerly-card border border-gray-300 bg-white text-nixerly-darkgray rounded-lg animate-fade-in py-0 gap-0">
      <div className="flex gap-5 border-b border-gray-300 px-6 py-4">
      <div className="flex items-center justify-center h-10 w-10  md:w-14 md:h-14 border border-gray-300 rounded-full">
            <span className="text-lg sm:text-base font-medium">03</span>
          </div>
        <div>
        <h2 className="text-lg font-bold my-1 text-nixerly-blue">All Languages</h2>
        <p className="text-base font-medium">Please Provide The Following Information To Get Started</p>
        </div>
      </div>
        <div className="space-y-8 p-6">
          <FormField
            control={control}
            name="languages"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex items-center gap-2 mb-4 border">
                  <FormLabel className="text-lg text-nixerly-darkgray font-medium">Add a language</FormLabel>
                  <Image src="/info.svg" alt="info" width={14} height={14} />
                </div>

                <FormControl>
                  <div className="space-y-4">
                    {/* Add Language Button - shown when no languages or as first item */}
                    {(!field.value || field.value.length === 0) && (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleAddLanguage}
                          className="text-gray-500 hover:text-gray-700 border border-gray-400"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Language
                        </Button>
                      </div>
                    )}


                         {/* Add More Languages Button */}
                         {field.value && field.value.length > 0 && field.value.length < 4 && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleAddLanguage}
                        className="w-full font-inter text-nixerly-businesslabel text-sm font-normal tracking-tight focus:border-black focus-visible:ring-nixerly-blue rounded-md border border-nixerly-bussinessborder p-5 hover:decoration-none"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Language
                      </Button>
                    )}

                    {/* Language Entries */}
                    {field.value?.map((language, index) => {
                      // Filter out languages already selected in other rows
                      const selectedLanguages = field.value.map((l, i) => (i !== index ? l.name : null)).filter(Boolean)
                      const availableLanguages = onboardingOptions.languages.filter(
                        (lang) => !selectedLanguages.includes(lang.value) || lang.value === language.name,
                      )

                      return (
                        <div key={index} className="space-y-2">
                          <div className="w-full flex gap-4">
                            <div className="flex-1 border border-gray-300 rounded-lg">
                              <Select
                                value={language.name}
                                onValueChange={(value) => {
                                  const newLanguages = [...field.value]
                                  newLanguages[index] = {
                                    ...newLanguages[index],
                                    name: value,
                                  }
                                  field.onChange(newLanguages)
                                }}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="English" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableLanguages.map((lang) => (
                                    <SelectItem key={lang.value} value={lang.value}>
                                      {lang.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex-1 border border-gray-300 rounded-lg">
                              <Select
                                value={language.proficiency}
                                onValueChange={(value) => {
                                  const newLanguages = [...field.value]
                                  newLanguages[index] = {
                                    ...newLanguages[index],
                                    proficiency: value,
                                  }
                                  field.onChange(newLanguages)
                                }}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Fluent" />
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
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveLanguage(index)}
                              className="text-nixerly-blue hover:text-nixerly-darkblue"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          {errors?.languages && errors.languages[index] && "name" in errors.languages[index] && (
                            <p className="text-nixerly-coral mt-1 text-sm">Required</p>
                          )}
                        </div>
                      )
                    })}

               
                  </div>
                </FormControl>

                {/* <FormDescription className="text-sm text-nixerly-darkgray/50 mt-2">
                  Add up to 4 languages you are proficient in
                </FormDescription> */}
                <FormMessage className="text-nixerly-coral mt-1" />
              </FormItem>
            )}
          />
        </div>
          <div className="flex justify-end pt-8 p-6 border-t border-gray-300">
            <Button
              type="button"
              onClick={handleContinue}
              disabled={isPending}
              className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white rounded-full px-8 py-3 h-12 text-base font-medium shadow-nixerly-button transition-all duration-200"
            >
              {isPending ? "Saving..." : "Next"}
            </Button>
          </div>
    </Card>
    </div>
  );
};
