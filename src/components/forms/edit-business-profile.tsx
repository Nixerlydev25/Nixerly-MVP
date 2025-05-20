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

const profileFormSchema = z.object({
  industry: z.string().min(1, { message: 'Please select an industry' }),
  location: z
    .string()
    .min(3, { message: 'Location must be at least 3 characters' }),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  website: z.string().url({ message: 'Please enter a valid URL' }).optional(),
  employeeCount: z.union([
    z.number().int().positive(),
    z.string().refine((val) => {
      const num = Number(val);
      return Number.isInteger(num) && num > 0;
    }, 'Must be a positive integer string'),
  ]),
  yearFounded: z.coerce
    .number()
    .int()
    .min(1800, { message: 'Year must be 1800 or later' })
    .max(new Date().getFullYear(), {
      message: 'Year cannot be in the future',
    }),
});

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
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultValues || {
      industry: '',
      location: '',
      city: '',
      state: '',
      country: '',
      website: '',
      employeeCount: 0,
      yearFounded: new Date().getFullYear(),
    },
  });

  const handleLocationSelect = (locationDetails: LocationDetails) => {
    form.setValue('location', locationDetails.formattedAddress);
    form.setValue('city', locationDetails.city);
    form.setValue('state', locationDetails.state);
    form.setValue('country', locationDetails.country);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
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
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
                <FormControl>
                  <LocationSearch
                    defaultValue={`${form.getValues("city")}, ${form.getValues(
                      "state"
                    )}, ${form.getValues("country")}`}
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
                <FormControl>
                  <Input {...field} placeholder="https://example.com" />
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
                  <FormControl>
                    <Input {...field} type="number" />
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
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
