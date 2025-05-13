"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Briefcase, Calendar } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { useCreateExperience } from "@/hook/experiences/experiences.hook";
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks";
import { OnboardingStepWorkerProfileB } from "@/types/onboarding";

export const ExperienceInfo = () => {
  const {
    control,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<WorkerOnboardingSchema>();
  const { goToNextStep } = useOnboardingNavigation();
  const { mutateAsync: createExperience } = useCreateExperience();
  const { mutateAsync: updateWorkerProfile, isPending } =
    useUpdateWorkerProfile();
  // const skills = watch("skills") || [];
  const experience = watch("experience") || [];
  const formData = watch();

  const handleContinue = async () => {
    const fieldsToValidate = ["experience"] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      const { experience } = formData;
      console.log(experience,"experience");
      await createExperience(experience,{
        onSuccess: async () => {
          await updateWorkerProfile({
            onboardingStep: OnboardingStepWorkerProfileB.EDUCATIONAL_INFO,
          });
        },
      });
      goToNextStep();
    }
  };

  // Helper function to find a skill label from value

  const addExperience = () => {
    setValue("experience", [
      ...(experience || []),
      {
        title: "",
        company: "",
        location: "",
        startDate: new Date(),
        endDate: undefined,
        description: "",
        current: false,
      },
    ]);
  };

  const removeExperience = (index: number) => {
    const newExperience = [...experience];
    newExperience.splice(index, 1);
    setValue("experience", newExperience);
  };

  const handleCurrentPositionChange = (index: number, checked: boolean) => {
    const newExperience = [...experience];
    if (checked) {
      // If setting to current, unset all other current positions
      newExperience.forEach((exp, i) => {
        if (i !== index) {
          exp.current = false;
        }
      });
    }
    newExperience[index].current = checked;
    setValue("experience", newExperience);
  };

  console.log(errors, "errors");

  return (
    <Card className="p-8 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-nixerly-darkblue">
        Experience Details
      </h2>

      <div className="space-y-6 mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-nixerly-darkblue flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Work Experience
          </h3>
          {experience.length !== 0 && (
            <Button
              type="button"
              onClick={addExperience}
              variant="outline"
              className="border-nixerly-lightblue hover:bg-nixerly-ultralightblue text-nixerly-darkblue"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Experience
            </Button>
          )}
        </div>

        {experience.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-nixerly-lightblue rounded-lg bg-nixerly-ultralightblue/50">
            <p className="text-nixerly-darkgray">
              No work experience added yet
            </p>
            <Button
              type="button"
              onClick={addExperience}
              variant="outline"
              className="mt-4 border-nixerly-lightblue hover:bg-nixerly-ultralightblue text-nixerly-darkblue"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Experience
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {experience.map((_, index) => (
              <Card key={index} className="p-5 border border-nixerly-lightblue">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium text-nixerly-darkblue">
                    Experience {index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeExperience(index)}
                    className="h-8 w-8 p-0 text-nixerly-coral hover:text-nixerly-coral/80 hover:bg-nixerly-coral/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  <FormField
                    control={control}
                    name={`experience.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                        <FormLabel className="text-nixerly-darkgray font-medium">
                          Job Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Software Engineer"
                            {...field}
                            className="py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20"
                          />
                        </FormControl>
                        <FormMessage className="text-nixerly-coral" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`experience.${index}.company`}
                    render={({ field }) => (
                      <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                        <FormLabel className="text-nixerly-darkgray font-medium">
                          Company
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Acme Inc."
                            {...field}
                            className="py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20"
                          />
                        </FormControl>
                        <FormMessage className="text-nixerly-coral" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`experience.${index}.location`}
                    render={({ field }) => (
                      <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                        <FormLabel className="text-nixerly-darkgray font-medium">
                          Location
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. New York, NY"
                            {...field}
                            className="py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20"
                          />
                        </FormControl>
                        <FormMessage className="text-nixerly-coral" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`experience.${index}.current`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 h-[72px] flex-1 min-w-[calc(50%-8px)]">
                        <div className="space-y-0.5">
                          <FormLabel className="text-nixerly-darkgray font-medium">
                            Current Position
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              handleCurrentPositionChange(index, checked);
                            }}
                            disabled={experience.some((exp, i) => i !== index && exp.current)}
                            className="data-[state=checked]:bg-nixerly-blue"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-wrap gap-4 mt-4 items-start">
                  <FormField
                    control={control}
                    name={`experience.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                        <FormLabel className="text-nixerly-darkgray font-medium">
                          Start Date
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:border-nixerly-blue focus-within:ring-2 focus-within:ring-nixerly-blue/20">
                            <Calendar className="ml-3 h-4 w-4 text-nixerly-darkgray" />
                            <DatePicker
                              selected={field.value}
                              onSelect={field.onChange}
                              className="py-2.5 pl-2 w-full border-0 focus:ring-0"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-nixerly-coral" />
                      </FormItem>
                    )}
                  />

                  {!watch(`experience.${index}.current`) && (
                    <FormField
                      control={control}
                      name={`experience.${index}.endDate`}
                      render={({ field }) => (
                        <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                          <FormLabel className="text-nixerly-darkgray font-medium">
                            End Date
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center border rounded-md focus-within:border-nixerly-blue focus-within:ring-2 focus-within:ring-nixerly-blue/20">
                              <Calendar className="ml-3 h-4 w-4 text-nixerly-darkgray" />
                              <DatePicker
                                selected={field.value}
                                onSelect={field.onChange}
                                className="py-2.5 pl-2 w-full border-0 focus:ring-0"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-nixerly-coral" />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <div className="mt-4">
                  <FormField
                    control={control}
                    name={`experience.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-nixerly-darkgray font-medium">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your responsibilities and achievements"
                            {...field}
                            className="min-h-[100px] focus:border-nixerly-blue focus:ring-nixerly-blue/20"
                          />
                        </FormControl>
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

      <div className="flex justify-end pt-6 mt-6">
        <Button
          type="button"
          onClick={handleContinue}
          disabled={
            isPending || experience.length === 0
          }
          className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-8 py-2.5 shadow-nixerly-button transition-all duration-200"
        >
          Next
        </Button>
      </div>
    </Card>
  );
};
