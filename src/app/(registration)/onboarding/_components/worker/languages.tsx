import { useFormContext } from "react-hook-form";
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
import { ChevronRight, Plus, X } from "lucide-react";
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
    <Card className="p-10 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
      <h2 className="text-3xl font-semibold mb-8 text-nixerly-darkblue">
        Languages
      </h2>
      <div className="space-y-8">
        <FormField
          control={control}
          name="languages"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">
                All a language
              </FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {field.value?.map((language, index) => {
                    // Filter out languages already selected in other rows
                    const selectedLanguages = field.value
                      .map((l, i) => (i !== index ? l.name : null))
                      .filter(Boolean);
                    const availableLanguages =
                      onboardingOptions.languages.filter(
                        (lang) =>
                          !selectedLanguages.includes(lang.value) ||
                          lang.value === language.name
                      );
                    return (
                      <div key={index}>
                        <div className="w-full flex gap-4">
                          <div className="flex-1">
                            <Select
                              value={language.name}
                              onValueChange={(value) => {
                                const newLanguages = [...field.value];
                                newLanguages[index] = {
                                  ...newLanguages[index],
                                  name: value,
                                };
                                field.onChange(newLanguages);
                              }}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableLanguages.map((lang) => (
                                  <SelectItem
                                    key={lang.value}
                                    value={lang.value}
                                  >
                                    {lang.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex-1">
                            <Select
                              value={language.proficiency}
                              onValueChange={(value) => {
                                const newLanguages = [...field.value];
                                newLanguages[index] = {
                                  ...newLanguages[index],
                                  proficiency: value,
                                };
                                field.onChange(newLanguages);
                              }}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select proficiency" />
                              </SelectTrigger>
                              <SelectContent>
                                {onboardingOptions.proficiencyLevels.map(
                                  (level) => (
                                    <SelectItem
                                      key={level.value}
                                      value={level.value}
                                    >
                                      {level.label}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveLanguage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        {errors?.languages &&
                          errors.languages[index] &&
                          "name" in errors.languages[index] && (
                            <p className="text-nixerly-coral mt-1 text-sm">
                              Required
                            </p>
                          )}
                      </div>
                    );
                  })}
                  {field.value?.length < 4 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddLanguage}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Language
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormDescription className="text-sm text-nixerly-darkgray/50 mt-2">
                Add up to 4 languages you are proficient in
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
