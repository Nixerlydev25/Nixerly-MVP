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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, GraduationCap, Calendar } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";

interface EducationData {
  id?: string;
  workerId?: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  currentlyStudying: boolean;
  description?: string;
}

const educationSchema = z
  .object({
    school: z
      .string({ required_error: "School is required" })
      .min(1, "School is required"),
    degree: z
      .string({ required_error: "Degree is required" })
      .min(1, "Degree is required"),
    fieldOfStudy: z
      .string({ required_error: "Field of study is required" })
      .min(1, "Field of study is required"),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }).optional(),
    description: z.string().optional(),
    currentlyStudying: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.currentlyStudying) {
        return true; // If currentlyStudying is true, endDate is not required
      }
      return !!data.endDate; // If currentlyStudying is false, endDate is required
    },
    {
      message: "End date is required unless you are currently studying here",
      path: ["endDate"],
    }
  );

const formSchema = z.object({
  education: z
    .array(educationSchema)
    .min(1, "At least one education entry is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditEducationFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: {
    education: EducationData[];
  };
}

export function EditEducationForm({
  onSubmit,
  defaultValues,
}: EditEducationFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education:
        defaultValues?.education?.map((edu) => ({
          school: edu.school,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          startDate: new Date(edu.startDate),
          endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          description: edu.description || "",
          currentlyStudying: edu.currentlyStudying,
        })) || [],
    },
  });

  const education = form.watch("education") || [];

  const addEducation = () => {
    form.setValue("education", [
      ...education,
      {
        school: "",
        degree: "",
        fieldOfStudy: "",
        startDate: new Date(),
        endDate: undefined,
        description: "",
        currentlyStudying: false,
      },
    ]);
  };

  const removeEducation = (index: number) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    form.setValue("education", newEducation);
  };

  const handleCurrentlyStudyingChange = (index: number, checked: boolean) => {
    const newEducation = [...education];
    if (checked) {
      // If setting to currently studying, unset all other currently studying
      newEducation.forEach((edu, i) => {
        if (i !== index) {
          edu.currentlyStudying = false;
        }
      });
    }
    newEducation[index].currentlyStudying = checked;
    form.setValue("education", newEducation);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between sticky top-0 bg-white py-2 z-10">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </h3>
            {education.length !== 0 && (
              <Button
                type="button"
                onClick={addEducation}
                variant="outline"
                className="border-blue-200 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Education
              </Button>
            )}
          </div>

          {education.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-blue-200 rounded-lg bg-blue-50/50">
              <p className="text-gray-500">No education added yet</p>
              <Button
                type="button"
                onClick={addEducation}
                variant="outline"
                className="mt-4 border-blue-200 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Education
              </Button>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              {education.map((_, index) => (
                <div
                  key={index}
                  className="p-5 border border-blue-200 rounded-lg bg-white"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Education {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeEducation(index)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <FormField
                      control={form.control}
                      name={`education.${index}.school`}
                      render={({ field }) => (
                        <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                          <FormLabel>School</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Stanford University"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`education.${index}.degree`}
                      render={({ field }) => (
                        <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Bachelor of Science"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`education.${index}.fieldOfStudy`}
                      render={({ field }) => (
                        <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                          <FormLabel>Field of Study</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Computer Science"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`education.${index}.currentlyStudying`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 h-[72px] flex-1 min-w-[calc(50%-8px)]">
                          <div className="space-y-0.5">
                            <FormLabel>Currently Studying</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                handleCurrentlyStudyingChange(index, checked);
                              }}
                              disabled={education.some(
                                (edu, i) => i !== index && edu.currentlyStudying
                              )}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4 items-start">
                    <FormField
                      control={form.control}
                      name={`education.${index}.startDate`}
                      render={({ field }) => (
                        <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <div className="flex items-center border rounded-md">
                              <Calendar className="ml-3 h-4 w-4 text-gray-500" />
                              <DatePicker
                                selected={field.value}
                                onSelect={field.onChange}
                                className="py-2.5 pl-2 w-full border-0 focus:ring-0"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {!form.watch(`education.${index}.currentlyStudying`) && (
                      <FormField
                        control={form.control}
                        name={`education.${index}.endDate`}
                        render={({ field }) => (
                          <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <div className="flex items-center border rounded-md">
                                <Calendar className="ml-3 h-4 w-4 text-gray-500" />
                                <DatePicker
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  className="py-2.5 pl-2 w-full border-0 focus:ring-0"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name={`education.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your studies, achievements, or relevant activities"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white pt-4 border-t">
          <Button type="submit" className="w-full">
            Save Education
          </Button>
        </div>
      </form>
    </Form>
  );
}
