'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useModalStore } from '@/store/model.store';
import { ModalType } from '@/types/model';
import { PencilIcon, PlusCircle, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
// import { toast } from "@/hooks/use-toast"
// import { addEducation, updateEducation } from '@/app/api/profile/actions';

const educationSchema = z.object({
  institution: z.string().min(2, {
    message: 'Institution name must be at least 2 characters.',
  }),
  degree: z.string().min(2, {
    message: 'Degree must be at least 2 characters.',
  }),
  year: z.string().regex(/^\d{4}$/, {
    message: 'Year must be a 4-digit number.',
  }),
});

export type EducationFormValues = z.infer<typeof educationSchema>;

export function EditEducationModal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { activeModal, closeModal, modalData } = useModalStore();
  const isOpen = activeModal === ModalType.EDIT_EDUCATION;

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: modalData || {
      institution: '',
      degree: '',
      year: '',
    },
  });

  const resetForm = () => {
    form.reset({
      institution: '',
      degree: '',
      year: '',
    });
    setCurrentEducation(null);
    setIsEditing(false);
  };

  const handleEdit = (education: any) => {
    setCurrentEducation(education);
    form.reset({
      institution: education.institution,
      degree: education.degree,
      year: education.year,
    });
    setIsEditing(true);
  };

  async function onSubmit(values: EducationFormValues) {
    setIsSubmitting(true);
    try {
      // Use the values parameter, e.g., log or send to API
      console.log('Submitted education values:', values);
      form.reset();
      //   if (onSuccess) onSuccess()
    } catch {
      //   toast({
      //     title: "Error",
      //     description: "Something went wrong. Please try again.",
      //     variant: "destructive",
      //   })
    } finally {
      setIsSubmitting(false);
      closeModal();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Education</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* List of education entries */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Your Education</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  resetForm();
                  setIsEditing(true);
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>

            {Array.isArray(modalData?.education) &&
            modalData?.education.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No education entries yet. Add your first one!
              </div>
            ) : (
              <div className="space-y-3">
                {Array.isArray(modalData?.education) &&
                  modalData?.education.map((education: any) => (
                    <Card key={education.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">
                              {education.institution}
                            </h4>
                            <p className="text-gray-600">{education.degree}</p>
                            <p className="text-sm text-gray-500">
                              {education.year}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(education)}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              // onClick={() => handleDelete(education.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </div>

          {/* Form for adding/editing education */}
          {isEditing && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-4">
                  {currentEducation ? 'Edit Education' : 'Add Education'}
                </h3>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="University or School Name"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the name of the university or educational
                            institution.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Bachelor of Science in Computer Science"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter your degree or field of study.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input placeholder="2023" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the year you completed this education.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting
                          ? 'Saving...'
                          : currentEducation
                          ? 'Update'
                          : 'Add'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
