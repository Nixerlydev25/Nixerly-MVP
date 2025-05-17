"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Languages,
  Lightbulb,
  Award,
  Loader2,
  Save,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";

const formSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  additionalInstructions: z
    .string()
    .min(1, "Additional instructions are required"),
  standards: z.string().min(1, "Standards are required"),
  outputLanguage: z.string().min(1, "Output language is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function EditLessonPlanModal() {
  const { activeModal, closeModal, modalData } = useModalStore();
  const isOpen = activeModal === ModalType.EDIT_LESSON_PLAN;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  // Initialize form with data from modalData or default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "Exploring the Water Cycle and Its Impact on Earth’s Ecosystems",
      additionalInstructions:
        "Include a labeled diagram illustrating the stages of the water cycle (evaporation, condensation, precipitation, collection). Design a simple hands-on activity to simulate the water cycle using household materials. Add discussion prompts to help students relate the water cycle to climate patterns and water conservation. Use scientific terms along with relatable, real-life examples.",
      standards:
        "Next Generation Science Standards (NGSS) MS-ESS2-4: Develop a model to describe the cycling of water through Earth's systems driven by energy from the sun and the force of gravity.",
      outputLanguage: "English",
    },
  });

  // Reset form when modal opens with new data
  useState(() => {
    if (isOpen && modalData) {
      form.reset({
        topic: modalData.topic || "",
        additionalInstructions: modalData.additionalInstructions || "",
        standards: modalData.standards || "",
        outputLanguage: modalData.outputLanguage || "English",
      });
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate API call to update lesson plan
      console.log("Updating lesson plan:", data);
      if (!id) {
        throw new Error("update id not found");
      }

      // Close modal after successful update
      closeModal();
    } catch (error) {
      console.error("Error updating lesson plan:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => closeModal()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-600" />
            Edit Lesson Plan
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      Topic
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your lesson topic"
                        className="border-slate-300 focus-visible:ring-emerald-500"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The main subject of your lesson plan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      Additional Instructions
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional instructions or requirements"
                        className="min-h-32 border-slate-300 focus-visible:ring-emerald-500"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include specific activities, materials, or teaching
                      approaches you&#39;d like to incorporate
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="standards"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-purple-500" />
                        Standards
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter applicable standards"
                          className="border-slate-300 focus-visible:ring-emerald-500"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Educational standards this lesson should align with
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="outputLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Languages className="h-4 w-4 text-green-500" />
                        Output Language
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter desired output language"
                          className="border-slate-300 focus-visible:ring-emerald-500"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Language in which the lesson plan should be generated
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-6" />

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => closeModal()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
