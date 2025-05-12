"use client";

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
import type { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema";
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { OnboardingStepWorkerProfileB } from "@/types/onboarding";
import { Input } from "@/components/ui/input";

export function SkillsInfo() {
  const { goToNextStep } = useOnboardingNavigation();
  const { control, watch, trigger, setValue } = useFormContext<
    WorkerOnboardingSchema
  >();
  const { mutateAsync: updateWorker, isPending } = useUpdateWorkerProfile();
  const skills: string[] = [...(watch("skills") || [])] as string[];
  const [hourlyRate, setHourlyRate] = useState<string>("");
  const [skillInputError, setSkillInputError] = useState<string | null>(null);
  const [skillInputValue, setSkillInputValue] = useState<string>(""); // <-- add this

  const handleAddSkill = (skill: string) => {
    const newSkill = skill.trim();
    if (!newSkill) {
      setSkillInputError("Skill cannot be empty.");
      return;
    }
    if (skills.length >= 8) {
      setSkillInputError("You can add up to 8 skills only.");
      return;
    }
    if (skills.some((s) => s.toLowerCase() === newSkill.toLowerCase())) {
      setSkillInputError("Skill already added.");
      return;
    }
    setValue("skills", [...skills, newSkill]);
    setSkillInputError(null);
    setSkillInputValue(""); // <-- clear input only after successful add
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setValue(
      "skills",
      skills.filter((skill) => skill !== skillToRemove)
    );
    setSkillInputError(null);
  };

  const handleContinue = async () => {
    const isValid = await trigger("skills");
    console.log("skills", isValid);
    if (isValid) {
      await updateWorker({
        onboardingStep: OnboardingStepWorkerProfileB.PROFESSIONAL_INFO,
        hourlyRate: Number.parseFloat(hourlyRate) || 0,
        skills: skills,
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
          name="skills"
          render={() => (
            <FormItem className="space-y-4">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">
                Skills (Max 8)
              </FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="relative">
                    <div
                      className={`flex flex-wrap gap-2  min-h-[38px] rounded-md`}
                    >
                      <Input
                        type="text"
                        placeholder={
                          skills.length >= 8
                            ? "Maximum skills reached"
                            : "Type skill and press Tab or Enter to add"
                        }
                        disabled={skills.length >= 8}
                        value={skillInputValue} // <-- controlled input
                        onChange={(e) => setSkillInputValue(e.target.value)} // <-- update local state
                        onKeyDown={(e) => {
                          if (
                            (e.key === "Tab" || e.key === "Enter") &&
                            skillInputValue.trim()
                          ) {
                            e.preventDefault();
                            handleAddSkill(skillInputValue);
                          } else if (e.key === "Enter") {
                            // Prevent form submission on Enter even if input is empty
                            e.preventDefault();
                          }
                        }}
                        onFocus={() => setSkillInputError(null)}
                        // Prevent browser autocomplete from interfering
                        autoComplete="off"
                        // Make sure this input does not submit the form
                        formNoValidate
                      />
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="flex items-center gap-1 my-0.5"
                        >
                          {skill}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {skillInputError && (
                    <div className="text-sm text-nixerly-coral mt-1">
                      {skillInputError}
                    </div>
                  )}

                  <div className="mt-4">
                    <FormLabel className="text-sm text-nixerly-darkgray font-medium">
                      Hourly Rate (USD)
                    </FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter your hourly rate"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      className="mt-1"
                    />
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
            disabled={isPending || skills.length === 0}
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
