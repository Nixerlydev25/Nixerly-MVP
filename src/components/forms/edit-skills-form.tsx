"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useState, useRef, useEffect } from "react";
import { onboardingOptions } from "@/schema/onboarding/worker-onboarding.schema";

const skillValues = onboardingOptions.skills.map((s) => s.value as string);
const SkillEnum = z.enum(skillValues as [string, ...string[]]);

const formSchema = z.object({
  skills: z
    .array(SkillEnum, { required_error: "Select at least one skill" })
    .min(1, "At least one skill is required")
    .max(8, "Maximum of 8 skills allowed"),
});

interface EditSkillsFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
  onClose?: () => void;
}

export function EditSkillsForm({
  onSubmit,
  defaultValues,
  onClose,
}: EditSkillsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: defaultValues?.skills || [],
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);

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

  const handleSkillSelect = (value: string) => {
    const currentSkills = form.getValues("skills") || [];
    if (currentSkills.length < 8 && !currentSkills.includes(value)) {
      form.setValue("skills", [...currentSkills, value]);
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    const currentSkills = form.getValues("skills") || [];
    form.setValue(
      "skills",
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg font-medium">Skills</FormLabel>
              <FormControl>
                <div ref={commandRef}>
                  <Command className="border rounded-md py-1">
                    <CommandInput
                      placeholder="Search skills..."
                      onFocus={() => setIsOpen(true)}
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
                                if (field.value?.length === 8) {
                                  setIsOpen(false);
                                }
                              }}
                              className="flex items-center justify-between"
                            >
                              <span>{skill.label}</span>
                              {field.value?.includes(skill.value) && (
                                <Check className="h-4 w-4 text-blue-600" />
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
                  <Badge key={skill} variant="outline" className="px-3 py-1">
                    {
                      onboardingOptions.skills.find((s) => s.value === skill)
                        ?.label
                    }
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill)}
                      className="ml-2 hover:text-red-500 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <FormDescription>
                Select up to 8 skills that best represent your expertise
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
     <div className="flex justify-end gap-2 mt-8">
      <Button
        variant="outline"
        type="button"
        className="rounded-full"
        onClick={() => onClose && onClose()}
      >
        Cancel
      </Button>
      <Button type="submit" className="rounded-full bg-nixerly-blue">
        Save Changes
      </Button>
    </div>
      </form>
    </Form>
  );
}
