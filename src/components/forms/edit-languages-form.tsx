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
  // FormDescription,
} from "@/components/ui/form";
import { Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { onboardingOptions } from "@/schema/onboarding/worker-onboarding.schema";

const LanguageSchema = z.object({
  name: z.string({ required_error: "Required" }).min(1, "Required"),
  proficiency: z.string({ required_error: "Required" }).min(1, "Required"),
});

const formSchema = z.object({
  languages: z
    .array(LanguageSchema)
    .min(1, "At least one language is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditLanguagesFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: {
    languages: Array<{
      id?: string;
      language: string;
      proficiency: string;
    }>;
  };
}

export function EditLanguagesForm({
  onSubmit,
  defaultValues,
}: EditLanguagesFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      languages:
        defaultValues?.languages?.map((lang) => ({
          name: lang.language,
          proficiency: lang.proficiency,
        })) || [],
    },
  });

  const languages = form.watch("languages") || [];

  const handleAddLanguage = () => {
    if (languages.length < 4) {
      form.setValue("languages", [
        ...languages,
        { name: "", proficiency: "BASIC" },
      ]);
    }
  };

  const handleRemoveLanguage = (index: number) => {
    const newLanguages = [...languages];
    newLanguages.splice(index, 1);
    form.setValue("languages", newLanguages);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
        <div className="flex-none border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Languages</h3>
            {languages.length !== 0 && (
              <Button
                type="button"
                onClick={handleAddLanguage}
                variant="outline"
                className="border-blue-200 hover:bg-blue-50"
                disabled={languages.length >= 4}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Language
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {languages.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-blue-200 rounded-lg bg-blue-50/50">
              <p className="text-gray-500">No languages added yet</p>
              <Button
                type="button"
                onClick={handleAddLanguage}
                variant="outline"
                className="mt-4 border-blue-200 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Language
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {languages.map((_, index) => {
                // Filter out languages already selected in other rows
                const selectedLanguages = languages
                  .map((l, i) => (i !== index ? l.name : null))
                  .filter(Boolean);
                const availableLanguages = onboardingOptions.languages.filter(
                  (lang) =>
                    !selectedLanguages.includes(lang.value) ||
                    lang.value === languages[index].name
                );

                return (
                  <div key={index} className="flex gap-4 items-start">
                    <FormField
                      control={form.control}
                      name={`languages.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Language</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableLanguages.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value}>
                                  {lang.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`languages.${index}.proficiency`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Proficiency</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select proficiency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {onboardingOptions.proficiencyLevels.map(
                                (level) => (
                                  <SelectItem
                                    key={level.value}
                                    value={level.value}
                                  >
                                    {level.label}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveLanguage(index)}
                      className="mt-8 h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex-none border-t px-6 py-4">
          <Button type="submit" className="w-full">
            Save Languages
          </Button>
        </div>
      </form>
    </Form>
  );
}
