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
import { Plus, Trash2, GraduationCap, Calendar } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { useCreateEducation } from "@/hook/educations/educations.hook";
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks";
import { OnboardingStepWorkerProfileB } from "@/types/onboarding";

export const EducationInfo = () => {
  const {
    control,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<WorkerOnboardingSchema>();
  const { goToNextStep } = useOnboardingNavigation();
  const { mutateAsync: createEducations } = useCreateEducation();
  const { mutateAsync: updateWorkerProfile, isPending } =
    useUpdateWorkerProfile();
  // const skills = watch("skills") || [];
  const education = watch("education") || [];
  const formData = watch();

  const handleContinue = async () => {
    const fieldsToValidate = ["education"] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      const { education } = formData;
      console.log( education,"education");
      await createEducations(education, {
        onSuccess: async () => {
          await updateWorkerProfile({
            onboardingStep: OnboardingStepWorkerProfileB.AVAILABILITY_INFO,
          });
        },
      });
      goToNextStep();
    }
  };

  const addEducation = () => {
    setValue("education", [
      ...(education || []),
      {
        school: "",
        degree: "",
        fieldOfStudy: "",
        startDate: new Date(),
        endDate: undefined,
        description: "",
        currentlyStudying: false,
      },
    ]);
  };

  const removeEducation = (index: number) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setValue("education", newEducation);
  };

  const handleCurrentlyStudyingChange = (index: number, checked: boolean) => {
    const newEducation = [...education];
    if (checked) {
      // If setting to currently studying, unset all other currently studying
      newEducation.forEach((edu, i) => {
        if (i !== index) {
          edu.currentlyStudying = false;
        }
      });
    }
    newEducation[index].currentlyStudying = checked;
    setValue("education", newEducation);
  };

  console.log(errors, "errors");

  return (
    <Card className="p-8 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-nixerly-darkblue">
        Education Details Details
      </h2>

      <div className="space-y-6 mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-nixerly-darkblue flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education
          </h3>
          {education.length !== 0 && (
            <Button
              type="button"
              onClick={addEducation}
              variant="outline"
              className="border-nixerly-lightblue hover:bg-nixerly-ultralightblue text-nixerly-darkblue"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Education
            </Button>
          )}
        </div>

        {education.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-nixerly-lightblue rounded-lg bg-nixerly-ultralightblue/50">
            <p className="text-nixerly-darkgray">No education added yet</p>
            <Button
              type="button"
              onClick={addEducation}
              variant="outline"
              className="mt-4 border-nixerly-lightblue hover:bg-nixerly-ultralightblue text-nixerly-darkblue"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Education
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {education.map((_, index) => (
              <Card key={index} className="p-5 border border-nixerly-lightblue">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium text-nixerly-darkblue">
                    Education {index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeEducation(index)}
                    className="h-8 w-8 p-0 text-nixerly-coral hover:text-nixerly-coral/80 hover:bg-nixerly-coral/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  <FormField
                    control={control}
                    name={`education.${index}.school`}
                    render={({ field }) => (
                      <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                        <FormLabel className="text-nixerly-darkgray font-medium">
                          School
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Stanford University"
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
                    name={`education.${index}.degree`}
                    render={({ field }) => (
                      <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                        <FormLabel className="text-nixerly-darkgray font-medium">
                          Degree
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Bachelor of Science"
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
                    name={`education.${index}.fieldOfStudy`}
                    render={({ field }) => (
                      <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                        <FormLabel className="text-nixerly-darkgray font-medium">
                          Field of Study
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Computer Science"
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
                    name={`education.${index}.currentlyStudying`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 h-[72px] flex-1 min-w-[calc(50%-8px)]">
                        <div className="space-y-0.5">
                          <FormLabel className="text-nixerly-darkgray font-medium">
                            Currently Studying
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              handleCurrentlyStudyingChange(index, checked);
                            }}
                            disabled={education.some(
                              (edu, i) => i !== index && edu.currentlyStudying
                            )}
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
                    name={`education.${index}.startDate`}
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

                  {!watch(`education.${index}.currentlyStudying`) && (
                    <FormField
                      control={control}
                      name={`education.${index}.endDate`}
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
                    name={`education.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-nixerly-darkgray font-medium">
                          Description (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your studies, achievements, or relevant activities"
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
            isPending || education.length === 0
          }
          className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-8 py-2.5 shadow-nixerly-button transition-all duration-200"
        >
          Next
        </Button>
      </div>
    </Card>
  );
};
