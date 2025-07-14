import React, { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EditBusinessProfileModalData } from '../modals/edit-business-profile-modal';
import { LocationDetails, LocationSearch } from '../location-search';
import { DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';

interface BusinessData {
  employeeRanges: Array<{ value: string; label: string }>;
  industryOptions: Array<{ value: string; label: string }>;
}

import data from '@/data/onboarding/business.json' assert { type: 'json' };
import { Separator } from '../ui/separator';

const profileFormSchema = z.object({
  industry: z.string().min(1, { message: 'Please select an industry' }),
  location: z.string().min(3, { message: 'Location must be at least 3 characters' }),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  website: z.string().nullable().optional(),
  employeeCount: z.union([z.number(), z.string()]),
  yearFounded: z.number().int().min(1800).max(new Date().getFullYear()),
}) satisfies z.ZodType<EditBusinessProfileModalData>;

interface EditBusinessProfileFormProps {
  onSubmit: (data: EditBusinessProfileModalData) => void;
  defaultValues?: EditBusinessProfileModalData;
  onCancel?: () => void;
}

export function EditBusinessProfileForm({
  defaultValues,
  onSubmit,
  onCancel,
}: EditBusinessProfileFormProps) {
  const form = useForm<EditBusinessProfileModalData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultValues || {
      industry: '',
      location: '',
      city: '',
      state: '',
      country: '',
      website: '',
      employeeCount: '',
      yearFounded: new Date().getFullYear(),
    },
  });

  const handleLocationSelect = (locationDetails: LocationDetails) => {
    form.setValue('location', locationDetails.formattedAddress);
    form.setValue('city', locationDetails.city);
    form.setValue('state', locationDetails.state);
    form.setValue('country', locationDetails.country);
  };  

  useEffect(() => {
    if (defaultValues) {
      form.setValue('location', `${defaultValues.city}, ${defaultValues.state}, ${defaultValues.country}`);
    }
  }, [defaultValues]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 px-6">
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(data as BusinessData).industryOptions.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
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
            name="location"
            render={() => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl className='text-nixerly-businesslabel'>
                  <LocationSearch
                    defaultValue={`${form.getValues('city')}, ${form.getValues(
                      'state'
                    )}, ${form.getValues('country')}`}
                    onLocationSelect={handleLocationSelect}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website (optional)</FormLabel>
                <FormControl className='text-nixerly-businesslabel'>
                  <Input {...field} placeholder="https://example.com" value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="employeeCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Employees</FormLabel>
                  <FormControl className='text-nixerly-businesslabel'>
                    <Input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={field.value === 0 ? '' : field.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^\d+$/.test(value)) {
                          field.onChange(value === '' ? '' : Number(value));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearFounded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Founded</FormLabel>
                  <FormControl className='text-nixerly-businesslabel'>
                    <Input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={field.value || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^\d+$/.test(value)) {
                          field.onChange(
                            value === '' ? undefined : Number(value)
                          );
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator/>
        <DialogFooter>
          <Button className='rounded-full' type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button className='rounded-full bg-nixerly-blue' type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
