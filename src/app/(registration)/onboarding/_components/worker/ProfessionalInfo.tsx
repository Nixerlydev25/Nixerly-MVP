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
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation";
import { WorkerOnboardingSchema, onboardingOptions } from "@/schema/onboarding/worker-onboarding.schema";
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { TWorkerProfile } from "@/types/auth";

export const ProfessionalInfo = () => {
  const { control, watch, trigger } = useFormContext<WorkerOnboardingSchema>();
  const { goToNextStep, goToPreviousStep } = useOnboardingNavigation();
  const { mutateAsync: updateUserWorkerProfile } = useUpdateWorkerProfile();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const skills = watch("skills") || [];
  const formData = watch();
  
  const handleContinue = async () => {
    const fieldsToValidate = [
      "category",
      "hourlyRate",
      "skills",
      "availability",
    ] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      const { category, hourlyRate, skills, availability } = formData;
      
      const workerProfileData = {
        categoryId: category || null,
        hourlyRate: hourlyRate || null,
        skills: skills || [],
        availability: availability || false,
      } as Partial<TWorkerProfile>;
      
      await updateUserWorkerProfile(workerProfileData);
      goToNextStep();
    }
  };

  // Helper function to find a skill label from value
  const findSkillLabel = (skillValue: string): string => {
    if (selectedCategory && selectedCategory in onboardingOptions.skills) {
      const categorySkills = onboardingOptions.skills[selectedCategory as keyof typeof onboardingOptions.skills];
      const skill = categorySkills.find(s => s.value === skillValue);
      if (skill) {
        return skill.label;
      }
    }
    return skillValue;
  };

  return (
    <Card className="p-8 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-nixerly-darkblue">Professional Details</h2>
      <div className="space-y-7">
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-nixerly-darkgray font-medium">Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedCategory(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20">
                    <SelectValue placeholder="Select your category" />
                  </SelectTrigger>
                  <SelectContent>
                    {onboardingOptions.professions.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="text-sm text-nixerly-darkgray/50">
                Choose the main category that best describes your work
              </FormDescription>
              <FormMessage className="text-nixerly-coral" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="hourlyRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-nixerly-darkgray font-medium">Hourly Rate (USD)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={5}
                  max={500}
                  placeholder="Enter your hourly rate"
                  {...field}
                  className="py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? "" : Number(value));
                  }}
                />
              </FormControl>
              <FormDescription className="text-sm text-nixerly-darkgray/50">
                Set your hourly rate between $5 and $500
              </FormDescription>
              <FormMessage className="text-nixerly-coral" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-nixerly-darkgray font-medium">Skills</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    if (!field.value?.includes(value)) {
                      field.onChange([...(field.value || []), value]);
                    }
                  }}
                  disabled={!selectedCategory}
                >
                  <SelectTrigger className="py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20">
                    <SelectValue placeholder={selectedCategory ? "Select skills" : "First select a category"} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory && selectedCategory in onboardingOptions.skills ? 
                      onboardingOptions.skills[selectedCategory as keyof typeof onboardingOptions.skills].map((skill) => (
                        <SelectItem key={skill.value} value={skill.value}>
                          {skill.label}
                        </SelectItem>
                      )) : 
                      <SelectItem value="none" disabled>No skills available</SelectItem>
                    }
                  </SelectContent>
                </Select>
              </FormControl>
              {skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.map((skillValue: string, index: number) => (
                    <div 
                      key={index} 
                      className="bg-nixerly-ultralightblue border border-nixerly-lightblue text-nixerly-darkblue px-3 py-1.5 rounded-md flex items-center gap-2"
                    >
                      <span>{findSkillLabel(skillValue)}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newSkills = [...skills];
                          newSkills.splice(index, 1);
                          field.onChange(newSkills);
                        }}
                        className="text-nixerly-darkblue hover:text-nixerly-coral transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <FormDescription className="text-sm text-nixerly-darkgray/50">
                Select all relevant skills for your category
              </FormDescription>
              <FormMessage className="text-nixerly-coral" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="availability"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-nixerly-lightblue p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-nixerly-darkgray font-medium">Available for Work</FormLabel>
                <FormDescription className="text-sm text-nixerly-darkgray/50">
                  Show that you&apos;re available to take on new projects
                </FormDescription>
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
