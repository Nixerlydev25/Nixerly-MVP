'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { LocationSearch, LocationDetails } from '@/components/location-search';
import { Separator } from '../ui/separator';

const experienceSchema = z
  .object({
    title: z.string().min(1, 'Job title is required'),
    company: z.string().min(1, 'Company is required'),
    location: z.string().min(1, 'Location is required'),
    country: z.string().min(1, 'Country is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    startDate: z.date(),
    endDate: z.date().optional(),
    description: z.string().min(1, 'Description is required'),
    current: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.current) {
        return true;
      }
      return !!data.endDate;
    },
    {
      message: 'End date is required unless this is your current position',
      path: ['endDate'],
    }
  );

const formSchema = z.object({
  experience: z
    .array(experienceSchema)
    .min(1, 'At least one experience is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface ExperienceData {
  id: string;
  title: string;
  company: string;
  country: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface EditExperienceFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: {
    experience: ExperienceData[];
  };
  onCancel?: () => void;
}

export function EditExperienceForm({
  onSubmit,
  defaultValues,
  onCancel,
}: EditExperienceFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experience:
        defaultValues?.experience?.map((exp) => ({
          title: exp.title,
          company: exp.company,
          location: `${exp.city}, ${exp.state}, ${exp.country}`,
          city: exp.city,
          country: exp.country,
          state: exp.state,
          startDate: new Date(exp.startDate),
          endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          description: exp.description,
          current: exp.currentlyWorking,
        })) || [],
    },
  });

  const experience = form.watch('experience') || [];

  const addExperience = () => {
    form.setValue('experience', [
      ...experience,
      {
        title: '',
        company: '',
        location: '',
        city: '',
        country: '',
        state: '',
        startDate: new Date(),
        endDate: undefined,
        description: '',
        current: false,
      },
    ]);
  };

  const removeExperience = (index: number) => {
    const newExperience = [...experience];
    newExperience.splice(index, 1);
    form.setValue('experience', newExperience);
  };

  const handleCurrentPositionChange = (index: number, checked: boolean) => {
    const newExperience = [...experience];
    if (checked) {
      // If setting to current, unset all other current positions
      newExperience.forEach((exp, i) => {
        if (i !== index) {
          exp.current = false;
        }
      });
    }
    newExperience[index].current = checked;
    form.setValue('experience', newExperience);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6 px-4">
          <div className="tems-center justify-between sticky top-0 bg-white py-2 z-10">
            <h3 className="text-lg font-medium flex items-center gap-2 text-nixerly-businesslabel">
              Work Experience
            </h3>
            {experience.length !== 0 && (
              <Button
                type="button"
                onClick={addExperience}
                variant="outline"
                className="mt-2 w-full"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Experience
              </Button>
            )}
          </div>

          {experience.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-blue-200 rounded-lg bg-blue-50/50">
              <p className="text-gray-500">No work experience added yet</p>
              <Button
                type="button"
                onClick={addExperience}
                variant="outline"
                className="mt-4 border-blue-200 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Experience
              </Button>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              {experience.map((_, index) => (
                <div
                  key={index}
                  className=""
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Experience {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeExperience(index)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <FormField
                      control={form.control}
                      name={`experience.${index}.title`}
                      render={({ field }) => (
                        <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Software Engineer"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`experience.${index}.company`}
                      render={({ field }) => (
                        <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Acme Inc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`experience.${index}.location`}
                      render={({ field }) => (
                        <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <LocationSearch
                              onLocationSelect={(
                                locationDetails: LocationDetails
                              ) => {
                                form.setValue(
                                  `experience.${index}.location`,
                                  locationDetails.formattedAddress
                                );
                                form.setValue(
                                  `experience.${index}.city`,
                                  locationDetails.city
                                );
                                form.setValue(
                                  `experience.${index}.state`,
                                  locationDetails.state
                                );
                                form.setValue(
                                  `experience.${index}.country`,
                                  locationDetails.country
                                );
                              }}
                              defaultValue={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`experience.${index}.current`}
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg p-3 h-[72px] flex-1 min-w-[calc(50%-8px)]">
                          <FormControl>
                            <div className="flex items-center gap-4 pt-8">
                              <Switch
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                  field.onChange(checked);
                                  handleCurrentPositionChange(index, checked);
                                }}
                                disabled={experience.some(
                                  (exp, i) => i !== index && exp.current
                                )}
                              />
                              <FormLabel className="m-0">Current Position</FormLabel>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                  </div>

                  <div className="flex flex-wrap gap-4 mt-4 items-start">
                    <FormField
                      control={form.control}
                      name={`experience.${index}.startDate`}
                      render={({ field }) => (
                        <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <div className="flex items-center border rounded-md">
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

                    {!form.watch(`experience.${index}.current`) && (
                      <FormField
                        control={form.control}
                        name={`experience.${index}.endDate`}
                        render={({ field }) => (
                          <FormItem className="space-y-2 flex-1 min-w-[calc(50%-8px)]">
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <div className="flex items-center border rounded-md">
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
                      name={`experience.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your responsibilities and achievements"
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
        <Separator />
        <div className="flex justify-end px-4 pb-4 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className='rounded-full'
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="rounded-full bg-nixerly-blue"
            onContextMenu={e => {
              e.preventDefault();
              onCancel?.();
            }}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
