import { useFormContext } from "react-hook-form";
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
import {
  WorkerOnboardingSchema,
  onboardingOptions,
} from "@/schema/onboarding/worker-onboarding.schema";
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { OnboardingStepWorkerProfileB } from "@/types/onboarding";

export function SkillsInfo() {
  const { goToNextStep } = useOnboardingNavigation();
  const { control, watch, trigger, setValue } =
    useFormContext<WorkerOnboardingSchema>();
  const { mutateAsync: updateWorker, isPending } = useUpdateWorkerProfile();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const categorySkills = watch("categorySkills") || [];

  const handleAddCategory = (category: string) => {
    if (categorySkills.length >= 4) {
      return; // Maximum 4 categories allowed
    }
    if (!categorySkills.find((cs) => cs.category === category)) {
      setValue("categorySkills", [...categorySkills, { category, skills: [] }]);
    }
    setSelectedCategory(category);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const getAvailableSkills = (category: string) => {
    const skills = onboardingOptions.skills[category as keyof typeof onboardingOptions.skills];
    return skills || [];
  };

  const handleRemoveCategory = (category: string) => {
    setValue(
      "categorySkills",
      categorySkills.filter((cs) => cs.category !== category)
    );
    if (selectedCategory === category) {
      setSelectedCategory("");
    }
  };

  const handleAddSkill = (skill: string) => {
    const categoryIndex = categorySkills.findIndex(
      (cs) => cs.category === selectedCategory
    );
    if (categoryIndex === -1) return;

    const updatedCategorySkills = [...categorySkills];
    if (!updatedCategorySkills[categoryIndex].skills.includes(skill)) {
      updatedCategorySkills[categoryIndex].skills.push(skill);
      setValue("categorySkills", updatedCategorySkills);
    }
  };

  const handleRemoveSkill = (category: string, skill: string) => {
    const categoryIndex = categorySkills.findIndex(
      (cs) => cs.category === category
    );
    if (categoryIndex === -1) return;

    const updatedCategorySkills = [...categorySkills];
    updatedCategorySkills[categoryIndex].skills = updatedCategorySkills[
      categoryIndex
    ].skills.filter((s) => s !== skill);
    setValue("categorySkills", updatedCategorySkills);
  };

  const handleContinue = async () => {
    const isValid = await trigger("categorySkills");
    if (isValid) {
      //update skills here
      await updateWorker({
        onboardingStep: OnboardingStepWorkerProfileB.PROFESSIONAL_INFO
      });
      goToNextStep();
    }
  };

  return (
    <Card className="p-10 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
      <h2 className="text-3xl font-semibold mb-8 text-nixerly-darkblue">
        Professional Skills
      </h2>
      <div className="space-y-8">
        <FormField
          control={control}
          name="categorySkills"
          render={() => (
            <FormItem className="space-y-4">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">
                Select Categories (Max 4)
              </FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Select
                    disabled={categorySkills.length >= 4}
                    value={selectedCategory}
                    onValueChange={handleAddCategory}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {onboardingOptions.professions.map((profession) => (
                        <SelectItem
                          key={profession.value}
                          value={profession.value}
                          disabled={categorySkills.some(
                            (cs) => cs.category === profession.value
                          )}
                        >
                          {profession.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="space-y-4">
                    {categorySkills.map((cs) => {
                      const availableSkills = getAvailableSkills(cs.category);
                      const isSelected = selectedCategory === cs.category;
                      
                      return (
                        <div
                          key={cs.category}
                          className={`border rounded-lg p-4 space-y-3 cursor-pointer transition-colors ${
                            isSelected ? 'border-nixerly-blue' : 'hover:border-nixerly-blue/50'
                          }`}
                          onClick={() => handleCategoryClick(cs.category)}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">
                              {
                                onboardingOptions.professions.find(
                                  (p) => p.value === cs.category
                                )?.label
                              }
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveCategory(cs.category);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            {isSelected && availableSkills.length > 0 && (
                              <Select onValueChange={handleAddSkill}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Add skills" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableSkills.map((skill) => (
                                    <SelectItem
                                      key={skill.value}
                                      value={skill.value}
                                      disabled={cs.skills.includes(skill.value)}
                                    >
                                      {skill.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            {availableSkills.length === 0 && (
                              <p className="text-sm text-nixerly-darkgray/70">
                                No specific skills available for this category
                              </p>
                            )}

                            <div className="flex flex-wrap gap-2">
                              {cs.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="flex items-center gap-1"
                                >
                                  {
                                    availableSkills.find((s) => s.value === skill)
                                      ?.label
                                  }
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveSkill(cs.category, skill);
                                    }}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FormControl>
              <FormMessage className="text-nixerly-coral" />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-8">
        <Button
            type="button"
            onClick={handleContinue}
            disabled={isPending || categorySkills.length === 0}
            className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-10 py-3 h-12 text-base font-medium shadow-nixerly-button transition-all duration-200"
          >
            {isPending ? "Saving..." : "Continue"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
