import Image from "next/image";
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
import { ChevronRight, Check, X, Info } from "lucide-react";
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
import { ProgressIndicator } from "../progress-indicator";

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
  const [hasStartedFilling, setHasStartedFilling] = useState(false);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (
        (value.skills && value.skills.length > 0) ||
        (typeof value.hourlyRate === "number" && value.hourlyRate > 0)
      ) {
        setHasStartedFilling(true);
      }
    });
    return () => subscription.unsubscribe && subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    // Removed setIsOpen(false) to keep dropdown open after selection
  };

  const handleSkillRemove = (skillToRemove: string) => {
    const currentSkills = formData.skills || [];
    setValue(
      "skills",
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ProgressIndicator currentStep={2} totalSteps={4} hasStartedFilling={hasStartedFilling} />
      <Card className="shadow-nixerly-card rounded-lg text-nixerly-businesslabel md:border border-gray-300 py-0 gap-0">
      <div className="flex items-center border-b border-gray-300 gap-3 px-6 py-4">
      <div className="flex items-center justify-center h-10 w-10  md:w-14 md:h-14 border border-gray-300 rounded-full">
            <span className="text-lg sm:text-base font-medium">02</span>
          </div> 
        <div>
          <h1 className="text-lg font-bold my-1 text-nixerly-blue">Skills & Hourly Rate</h1>
          <p className="text-base font-medium">Please Provide The Following Information To Get Started</p>
        </div>
      </div>

      <div className="space-y-8 px-6 py-4">
        <FormField
          control={control}
          name="skills"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="flex text-lg text-nixerly-darkgray font-medium">
              Skill Levels (max. 4)
           <Image src="/info.svg" alt="info" width={14} height={14}/>
              </FormLabel>
              <FormControl>
                <div ref={commandRef}>
                  <Command className="border rounded-md py-1 bg-white text-nixerly-businesslabel border-gray-300">
                    <CommandInput
                      placeholder="Search skills..."
                      onFocus={() => setIsOpen(true)}
                      className=""
                    />
                    {isOpen && (
                      <>
                        <CommandEmpty>No skills found.</CommandEmpty>
                        <CommandGroup className="max-h-[200px] overflow-auto border-t">
                          {onboardingOptions.skills.map((skill) => (
                            <CommandItem
                              key={skill.value}
                              value={skill.value}
                              onSelect={() => {
                                handleSkillSelect(skill.value);
                                if (formData.skills?.length === 8) {
                                  setIsOpen(false);
                                }
                              }}
                              className={`flex items-center justify-between ${
                                field.value?.includes(skill.value)
                                  ? "text-nixerly-businesslabel font-medium"
                                  : "text-nixerly-businesslabel font-medium"
                              }`}
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
                  <Badge key={skill} variant="outline" className="px-3 py-2 font-medium text-nixerly-businesslabel border border-gray-300">
                    {
                      onboardingOptions.skills.find((s) => s.value === skill)
                        ?.label
                    }
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill)}
                      className="ml-2 hover:text-nixerly-coral cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              {/* <FormDescription>
                Select up to 8 skills that best represent your expertise
              </FormDescription> */}
              <FormMessage className="text-nixerly-coral mt-1" />
            </FormItem>
          )}
        />

          <FormField
            control={control}
            name="hourlyRate"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex items-center gap-2 mb-4">
                  <FormLabel className="text-base font-medium text-gray-900">Hourly Rate</FormLabel>
               <Image src="/info.svg" alt="info" width={14} height={14}/>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      min={14}
                      placeholder="32"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-full font-inter text-sm font-normal leading-5 tracking-tight focus:border-black  text-black focus-visible:ring-nixerly-blue rounded-md border border-nixerly-bussinessborder p-5"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <span className="text-gray-500 font-medium">€</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 mt-2" />
              </FormItem>
            )}
          />
   </div>
        <div className="flex justify-end border-t border-gray-300 px-6 py-4">
          <Button
            type="button"
            onClick={handleContinue}
            disabled={isPending || skillPending}
            className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-8 py-3 h-12 rounded-full text-base font-medium shadow-nixerly-button transition-all duration-200 cursor-pointer"
          >
            {isPending || skillPending ? "Saving..." : "Continue"}
          </Button>
        </div>
   
    </Card>
    </div>
  );
};