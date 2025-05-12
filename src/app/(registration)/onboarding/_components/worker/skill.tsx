"use client"

import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// import { useOnboardingNavigation } from "@/hooks/onboarding/useOnboardingNavigation"
import { onboardingOptions, type WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema"
// import { useUpdateWorkerProfile } from "@/hooks/user/user.hooks"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { OnboardingStepWorkerProfileB } from "@/types/onboarding"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation"
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks"
import { useCreateSkills } from "@/hook/skills/skills.hook"

export function SkillsInfo() {
  const { goToNextStep } = useOnboardingNavigation()
  const { control, watch, trigger, setValue } = useFormContext<WorkerOnboardingSchema>()
  const { mutateAsync: updateWorker, isPending } = useUpdateWorkerProfile()
  const { mutateAsync: createSkills } = useCreateSkills()
  const skills: string[] = [...(watch("skills") || [])] as string[]
  const [hourlyRate, setHourlyRate] = useState<string>("")
  const [skillInputError, setSkillInputError] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const commandRef = useRef<HTMLDivElement>(null)

  // Filter out already selected skills and filter by search query
  const availableSkills = onboardingOptions.skills
    .filter((skill) => !skills.includes(skill.value))
    .filter((skill) => skill.label.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddSkill = (skill: string) => {
    if (skills.length >= 8) {
      setSkillInputError("Maximum of 8 skills allowed")
      return
    }

    if (skills.includes(skill)) {
      setSkillInputError("Skill already added")
      return
    }

    setValue("skills", [...skills, skill])
    setSkillInputError(null)
    setSearchQuery("")
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setValue(
      "skills",
      skills.filter((skill) => skill !== skillToRemove),
    )
    setSkillInputError(null)
  }

  const handleContinue = async () => {
    const isValid = await trigger("skills")
    console.log("skills", isValid)
    if (isValid) {
      await createSkills({skills}, {
        onSuccess: async () => {
          await updateWorker({
            onboardingStep: OnboardingStepWorkerProfileB.PROFESSIONAL_INFO,
            hourlyRate: Number(hourlyRate),
          })
        }
      })
      goToNextStep()
    }
  }

  // Close the command list when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <Card className="p-10 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
      <h2 className="text-3xl font-semibold mb-8 text-nixerly-darkblue">Professional Skills</h2>
      <div className="space-y-8">
        <FormField
          control={control}
          name="skills"
          render={() => (
            <FormItem className="space-y-4">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">Skills (Max 8)</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1 my-0.5">
                        {skill
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
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

                  <div className="relative" ref={commandRef}>
                    <Command className="rounded-lg border shadow-sm">
                      <CommandInput
                        placeholder={skills.length >= 8 ? "Maximum skills reached" : "Search skills..."}
                        disabled={skills.length >= 8}
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                        onFocus={() => setIsFocused(true)}
                        className="ring-0 focus:ring-0 focus:outline-none"
                      />
                      {isFocused && availableSkills.length > 0 && (
                        <div className="border-t border-gray-200">
                          <CommandList className="max-h-64 overflow-auto">
                            <CommandEmpty>No skills found.</CommandEmpty>
                            <CommandGroup>
                              {availableSkills.map((skill) => (
                                <CommandItem
                                  key={skill.id}
                                  value={skill.value}
                                  onSelect={() => handleAddSkill(skill.value)}
                                  className="cursor-pointer hover:bg-gray-100"
                                >
                                  {skill.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </div>
                      )}
                    </Command>
                  </div>

                  {skillInputError && <div className="text-sm text-nixerly-coral mt-1">{skillInputError}</div>}

                  <div className="mt-4">
                    <FormLabel className="text-sm text-nixerly-darkgray font-medium">Hourly Rate (USD)</FormLabel>
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
  )
}
