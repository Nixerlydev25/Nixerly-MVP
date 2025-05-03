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
import { OnboardingSchema, onboardingOptions, Profession } from "@/schema/onboarding/onboarding.schema";
import { useUpdateUser } from "@/hook/user/user.hooks";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export const ProfessionalInfo = () => {
  const { control, watch, trigger } = useFormContext<OnboardingSchema>();
  const { goToNextStep, goToPreviousStep } = useOnboardingNavigation();
  const { mutateAsync: updateUser } = useUpdateUser();
  const [selectedCategory, setSelectedCategory] = useState<Profession | null>(null);

  const skills = watch("skills") || [];
  const formData = watch();
  
  const handleContinue = async () => {
    const fieldsToValidate = [
      "title",
      "hourlyRate",
      "categoryId",
      "skills",
      "experienceLevel",
      "description"
    ] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      await updateUser({
        experienceLevel: formData.experienceLevel,
        workerProfile: {
          title: formData.title,
          hourlyRate: formData.hourlyRate,
          categoryId: formData.categoryId,
          skills: formData.skills,
          description: formData.description
        }
      });
      goToNextStep();
    }
  };

  // Helper function to find a skill label from value
  const findSkillLabel = (skillValue: string): string => {
    // Iterate through all skill categories
    for (const categorySkills of Object.values(onboardingOptions.skills)) {
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-nixerly-darkgray font-medium">Professional Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g. Senior Plumber, Electrician, etc." 
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
                    if (value === "") {
                      field.onChange("");
                    } else {
                      const num = parseFloat(value);
                      if (!isNaN(num)) {
                        field.onChange(num);
                      }
                    }
                  }}
                />
              </FormControl>
              <FormMessage className="text-nixerly-coral" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-nixerly-darkgray font-medium">Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedCategory(value as Profession);
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
                  {skills.map((skillValue, index) => (
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
              <FormMessage className="text-nixerly-coral" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="experienceLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-nixerly-darkgray font-medium">Experience Level</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {onboardingOptions.experienceLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-nixerly-coral" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-nixerly-darkgray font-medium">Professional Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your experience, expertise, and the services you offer..." 
                  className="min-h-[120px] py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20" 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-nixerly-coral" />
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
