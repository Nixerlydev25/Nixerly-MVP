"use client";

import { useForm, FormProvider } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation";
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks";
import { OnboardingStepWorkerProfileB } from "@/types/onboarding";
import { onboardingOptions } from "@/schema/onboarding/worker-onboarding.schema";

// Define the language and proficiency enums based on the provided values
const languageValues = [
  "ENGLISH",
  "SPANISH",
  "FRENCH",
  "GERMAN",
  "ITALIAN",
  "PORTUGUESE",
  "CHINESE",
  "JAPANESE",
  "ARABIC",
  "HINDI",
  "RUSSIAN",
  "OTHER",
];

const proficiencyValues = ["BASIC", "CONVERSATIONAL", "FLUENT", "NATIVE"];

const LanguageEnum = z.enum(languageValues as [string, ...string[]]);
const ProficiencyEnum = z.enum(proficiencyValues as [string, ...string[]]);

// Define the schema for the form
const formSchema = z.object({
  languages: z
    .array(
      z.object({
        name: LanguageEnum,
        proficiency: ProficiencyEnum,
      })
    )
    .min(1, "Add at least one language"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LanguageInfo() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      languages: [],
    },
  });

  const { control, watch, trigger, setValue } = methods;
  const { goToNextStep, goToPreviousStep } = useOnboardingNavigation();
  const {
    mutateAsync: updateWorkerProfile,
    isPending,
  } = useUpdateWorkerProfile();

  const languages = watch("languages") || [];

  const handleContinue = async () => {
    const isValid = await trigger("languages");
    if (isValid) {
      await updateWorkerProfile({
        onboardingStep: OnboardingStepWorkerProfileB.COMPLETED,
        // languages: languages,
      });
      goToNextStep();
    }
  };

  const addLanguage = () => {
    setValue("languages", [
      ...languages,
      {
        name: "",
        proficiency: "",
      },
    ]);
  };

  const removeLanguage = (index: number) => {
    const newLanguages = [...languages];
    newLanguages.splice(index, 1);
    setValue("languages", newLanguages);
  };

  return (
    <FormProvider {...methods}>
      <Card className="p-8 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
        <h2 className="text-2xl font-semibold mb-6 text-nixerly-darkblue">
          Language Proficiency
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-nixerly-darkblue flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Languages
            </h3>
            {languages.length !== 0 && (
              <Button
                type="button"
                onClick={addLanguage}
                variant="outline"
                className="border-nixerly-lightblue hover:bg-nixerly-ultralightblue text-nixerly-darkblue"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Language
              </Button>
            )}
          </div>

          {languages.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-nixerly-lightblue rounded-lg bg-nixerly-ultralightblue/50">
              <p className="text-nixerly-darkgray">No languages added yet</p>
              <Button
                type="button"
                onClick={addLanguage}
                variant="outline"
                className="mt-4 border-nixerly-lightblue hover:bg-nixerly-ultralightblue text-nixerly-darkblue"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Language
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {languages.map((_, index) => (
                <Card
                  key={index}
                  className="p-5 border border-nixerly-lightblue"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-nixerly-darkblue">
                      Language {index + 1}
                    </h4>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeLanguage(index)}
                      className="h-8 w-8 p-0 text-nixerly-coral hover:text-nixerly-coral/80 hover:bg-nixerly-coral/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name={`languages.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-nixerly-darkgray font-medium">
                            Language
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20">
                                <SelectValue placeholder="Select a language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {onboardingOptions.languages.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-nixerly-coral" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`languages.${index}.proficiency`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-nixerly-darkgray font-medium">
                            Proficiency Level
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20">
                                <SelectValue placeholder="Select proficiency level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {onboardingOptions.proficiencyLevels.map(
                                (option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-nixerly-coral" />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between pt-6 mt-6 border-t border-nixerly-lightblue">
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
            disabled={isPending || languages.length === 0}
            className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-8 py-2.5 shadow-nixerly-button transition-all duration-200"
          >
            Next
          </Button>
        </div>
      </Card>
    </FormProvider>
  );
}
