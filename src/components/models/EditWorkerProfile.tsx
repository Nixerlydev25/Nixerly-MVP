'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useModalStore } from '@/store/model.store';
import { ModalType } from '@/types/model';
import { LocationDetails, LocationSearch } from '../location-search';
import { useUpdateWorkerProfile } from '@/hook/user/user.hooks';
import { Switch } from '../ui/switch';

const profileSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Professional title must be at least 2 characters.' })
    .nullable()
    .optional(),
  hourlyRate: z
    .number({ invalid_type_error: 'Hourly rate must be a number.' })
    .nullable()
    .optional(),
  description: z
    .string()
    .min(2, { message: 'Description is required.' })
    .nullable()
    .optional(),
  city: z
    .string()
    .min(2, { message: 'City is required.' })
    .nullable()
    .optional(),
  state: z
    .string()
    .min(2, { message: 'State is required.' })
    .nullable()
    .optional(),
  country: z
    .string()
    .min(2, { message: 'Country is required.' })
    .nullable()
    .optional(),
  availability: z.boolean().optional(),
  location: z.string().nullable().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function EditWorkerProfile() {
  const [activeTab, setActiveTab] = useState('basic');

  const { mutateAsync, isPending } = useUpdateWorkerProfile();

  const { activeModal, closeModal, modalData } = useModalStore();
  const isOpen = activeModal === ModalType.EDIT_WORKER_PROFILE;
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: modalData,
  });

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await mutateAsync(values);
      form.reset();
      closeModal();
    } catch (error) {
      console.log('Error updating profile', error);
    } finally {
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="description">Bio & Expertise</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="basic" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Full Stack Developer"
                            {...field}
                            value={
                              field.value !== null && field.value !== undefined
                                ? field.value
                                : ''
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <LocationSearch
                            onLocationSelect={(
                              locationDetails: LocationDetails
                            ) => {
                              form.setValue(
                                `location`,
                                locationDetails.formattedAddress
                              );
                              form.setValue(`city`, locationDetails.city);
                              form.setValue(`state`, locationDetails.state);
                              form.setValue(`country`, locationDetails.country);
                            }}
                            defaultValue={
                              field.value === null ? undefined : field.value
                            }
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hourlyRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hourly Rate ($)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="45"
                            {...field}
                            value={
                              field.value !== null && field.value !== undefined
                                ? field.value
                                : ''
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="bio" className="space-y-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell clients about your professional background and expertise."
                          className="min-h-[200px]"
                          {...field}
                          value={
                            field.value !== null && field.value !== undefined
                              ? field.value
                              : ''
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Describe your skills, experience, and what makes you
                        unique.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <FormControl>
                        <>
                          <Switch
                            id="availability"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <span>Available for new projects</span>
                        </>
                      </FormControl>
                      <FormDescription>
                        Indicate your current availability for new projects.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Saving...' : 'Update Profile'}
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
