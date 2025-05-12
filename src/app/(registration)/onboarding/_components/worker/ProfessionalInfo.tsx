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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation";
import { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema";
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { TWorkerProfile } from "@/types/auth";
import { Plus, Trash2, Briefcase, GraduationCap, Calendar } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";

export const ProfessionalInfo = () => {
  const { control, watch, trigger, setValue } = useFormContext<
    WorkerOnboardingSchema
  >();
  const { goToNextStep, goToPreviousStep } = useOnboardingNavigation();
  const { mutateAsync: updateUserWorkerProfile } = useUpdateWorkerProfile();
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("experience");

  // const skills = watch("skills") || [];
  const experience = watch("experience") || [];
  const education = watch("education") || [];
  const formData = watch();

  const handleContinue = async () => {
    const fieldsToValidate = ["experience", "education"] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      const { experience, education } = formData;

      const workerProfileData = {
        experience: experience || [],
        education: education || [],
      } as Partial<TWorkerProfile>;

      await updateUserWorkerProfile(workerProfileData);
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
      },
    ]);
  };

  const removeEducation = (index: number) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setValue("education", newEducation);
  };

  return (
    <Card className="p-8 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-nixerly-darkblue">
        Professional Details
      </h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger
            value="experience"
            className="data-[state=active]:bg-nixerly-blue data-[state=active]:text-white"
          >
            Experience
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="data-[state=active]:bg-nixerly-blue data-[state=active]:text-white"
          >
            Education
          </TabsTrigger>
        </TabsList>

        <TabsContent value="experience">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-nixerly-darkblue flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Work Experience
              </h3>
              <Button
                type="button"
                onClick={addExperience}
                variant="outline"
                className="border-nixerly-lightblue hover:bg-nixerly-ultralightblue text-nixerly-darkblue"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Experience
              </Button>
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
                  <Card
                    key={index}
                    className="p-5 border border-nixerly-lightblue"
                  >
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={control}
                        name={`experience.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
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
                          <FormItem>
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
                          <FormItem>
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
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-nixerly-lightblue p-3">
                            <div className="space-y-0.5">
                              <FormLabel className="text-nixerly-darkgray font-medium">
                                Current Position
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-nixerly-blue"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <FormField
                        control={control}
                        name={`experience.${index}.startDate`}
                        render={({ field }) => (
                          <FormItem>
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
                            <FormItem>
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
                          <FormItem>
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
        </TabsContent>

        <TabsContent value="education">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-nixerly-darkblue flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education
              </h3>
              <Button
                type="button"
                onClick={addEducation}
                variant="outline"
                className="border-nixerly-lightblue hover:bg-nixerly-ultralightblue text-nixerly-darkblue"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Education
              </Button>
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
                  <Card
                    key={index}
                    className="p-5 border border-nixerly-lightblue"
                  >
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={control}
                        name={`education.${index}.school`}
                        render={({ field }) => (
                          <FormItem>
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
                          <FormItem>
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
                          <FormItem>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <FormField
                        control={control}
                        name={`education.${index}.startDate`}
                        render={({ field }) => (
                          <FormItem>
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

                      <FormField
                        control={control}
                        name={`education.${index}.endDate`}
                        render={({ field }) => (
                          <FormItem>
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
                    </div>

                    <div className="mt-4">
                      <FormField
                        control={control}
                        name={`education.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
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
        </TabsContent>
      </Tabs>

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
          className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-8 py-2.5 shadow-nixerly-button transition-all duration-200"
        >
          Next
        </Button>
      </div>
    </Card>
  );
};
