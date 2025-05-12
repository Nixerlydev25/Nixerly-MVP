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
import { Input } from "@/components/ui/input";
import { OnboardingStepWorkerProfileB } from "@/types/onboarding";
import { ChevronRight, Check, X } from "lucide-react";
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks";
import { onboardingOptions } from "@/schema/onboarding/worker-onboarding.schema";
import { Badge } from "@/components/ui/badge";
import { useCreateSkills } from "@/hook/skills/skills.hook";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useState, useRef, useEffect } from "react";

export const SkillsInfo = () => {
  const { goToNextStep } = useOnboardingNavigation();
  const { control, watch, trigger, setValue } =
    useFormContext<WorkerOnboardingSchema>();
  const { mutateAsync: updateWorker, isPending } = useUpdateWorkerProfile();
  const { mutateAsync: updateSkill, isPending: skillPending } =
    useCreateSkills();
  const formData = watch();
  const [isOpen, setIsOpen] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleContinue = async () => {
    const fieldsToValidate = ["skills", "hourlyRate"] as const;
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      const { skills, hourlyRate } = formData;
      
      const workerProfileData = {
        skills,
        hourlyRate,
        onboardingStep: OnboardingStepWorkerProfileB.LANGUAGE_INFO,
      };

      await updateSkill(
        { skills },
        {
          async onSuccess() {
            await updateWorker(workerProfileData);
          },
        }
      );
      goToNextStep();
    }
  };

  const handleSkillSelect = (value: string) => {
    const currentSkills = formData.skills || [];
    if (currentSkills.length < 8 && !currentSkills.includes(value)) {
      setValue("skills", [...currentSkills, value]);
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    const currentSkills = formData.skills || [];
    setValue(
      "skills",
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <Card className="p-10 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
      <h2 className="text-3xl font-semibold mb-8 text-nixerly-darkblue">
        Skills & Rate
      </h2>
      <div className="space-y-8">
        <FormField
          control={control}
          name="skills"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">
                Skills
              </FormLabel>
              <FormControl>
                <div ref={commandRef}>
                  <Command className="border rounded-md">
                    <CommandInput 
                      placeholder="Search skills..." 
                      onFocus={() => setIsOpen(true)}
                    />
                    {isOpen && (
                      <>
                        <CommandEmpty>No skills found.</CommandEmpty>
                        <CommandGroup className="max-h-[200px] overflow-auto">
                          {onboardingOptions.skills.map((skill) => (
                            <CommandItem
                              key={skill.value}
                              value={skill.value}
                              onSelect={() => {
                                handleSkillSelect(skill.value);
                                setIsOpen(false);
                              }}
                              className="flex items-center justify-between"
                            >
                              <span>{skill.label}</span>
                              {field.value?.includes(skill.value) && (
                                <Check className="h-4 w-4 text-nixerly-blue" />
                              )}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </>
                    )}
                  </Command>
                </div>
              </FormControl>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value?.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-nixerly-lightblue text-nixerly-darkblue px-3 py-1"
                  >
                    {
                      onboardingOptions.skills.find((s) => s.value === skill)
                        ?.label
                    }
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill)}
                      className="ml-2 hover:text-nixerly-coral"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <FormDescription className="text-sm text-nixerly-darkgray/50 mt-2">
                Select up to 8 skills that best represent your expertise
              </FormDescription>
              <FormMessage className="text-nixerly-coral mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="hourlyRate"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">
                Hourly Rate
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={14}
                  placeholder="Enter your hourly rate (minimum $14)"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="w-full h-12 py-3 px-4 text-base focus:border-nixerly-blue focus:ring-nixerly-blue/20"
                />
              </FormControl>
              <FormDescription className="text-sm text-nixerly-darkgray/50 mt-2">
                Specify your hourly rate in your local currency (minimum $14)
              </FormDescription>
              <FormMessage className="text-nixerly-coral mt-1" />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-8">
          <Button
            type="button"
            onClick={handleContinue}
            disabled={isPending || skillPending}
            className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-10 py-3 h-12 text-base font-medium shadow-nixerly-button transition-all duration-200"
          >
            {isPending || skillPending ? "Saving..." : "Continue"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
