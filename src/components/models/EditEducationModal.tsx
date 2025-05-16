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
    function onSuccess(): void {
        throw new Error('Function not implemented.');
    }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{'Add Education'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input placeholder="University or School Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the university or educational institution.
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
                onClick={() => onSuccess?.()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? 'Saving...'
                //   : id
                //   ? 'Update Education'
                  : 'Add Education'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
