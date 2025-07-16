import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export interface EditBusinessOwnerData {
  firstName: string;
  lastName: string;
}

const businessOwnerFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

interface EditBusinessOwnerFormProps {
  onSubmit: (data: EditBusinessOwnerData) => void;
  defaultValues?: EditBusinessOwnerData;
  onCancel?: () => void;
}

export function EditBusinessOwnerForm({
  defaultValues,
  onSubmit,
  onCancel,
}: EditBusinessOwnerFormProps) {
  const form = useForm<EditBusinessOwnerData>({
    resolver: zodResolver(businessOwnerFormSchema),
    defaultValues: defaultValues || {
      firstName: '',
      lastName: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 px-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-nixerly-businesslabel">First Name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Enter first name"
                    className="border-nixerly-bussinessborder"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-nixerly-businesslabel">Last Name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Enter last name"
                    className="border-nixerly-bussinessborder"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="rounded-full"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="rounded-full bg-nixerly-blue"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
} 