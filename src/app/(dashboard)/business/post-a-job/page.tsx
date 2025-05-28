'use client';

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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { useState, useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import workerData from '@/data/onboarding/worker.json';
import { useCreateJob } from '@/hook/jobs/jobs.hooks';
import { LocationSearch } from '@/components/location-search';
// Define the form schema with Zod
const formSchema = z
  .object({
    title: z
      .string()
      .min(5, { message: 'Title must be at least 5 characters' })
      .max(100, { message: 'Title must be less than 100 characters' }),
    description: z
      .string()
      .min(20, { message: 'Description must be at least 20 characters' }),
    requirements: z
      .string()
      .min(20, { message: 'Requirements must be at least 20 characters' }),
    budget: z
      .number()
      .positive({ message: 'Budget must be a positive number' })
      .optional(),
    hourlyRateMin: z
      .number()
      .positive({ message: 'Minimum hourly rate must be a positive number' })
      .optional(),
    hourlyRateMax: z
      .number()
      .positive({ message: 'Maximum hourly rate must be a positive number' })
      .optional(),
    salary: z
      .number()
      .positive({ message: 'Salary must be a positive number' })
      .optional(),
    status: z.enum(['OPEN', 'CLOSED', 'FILLED', 'EXPIRED'], {
      required_error: 'Please select a job status',
    }),
    skills: z
      .array(z.string())
      .min(1, { message: 'Please select at least one skill' }),
    jobType: z.enum(['HOURLY', 'SALARY', 'CONTRACT'], {
      required_error: 'Please select a job type',
    }),
    startDate: z.date({
      required_error: 'Please select a start date',
    }),
    numberOfWorkersRequired: z.number().int().positive({
      message: 'Number of professionals must be a positive integer',
    }),
    location: z.object({
      street: z.string().optional(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      postalCode: z.string().optional(),
    }),
  })
  .refine(
    (data) => {
      // If both hourly rates are provided, max should be greater than or equal to min
      if (
        data.jobType === 'HOURLY' &&
        data.hourlyRateMin !== undefined &&
        data.hourlyRateMax !== undefined
      ) {
        return data.hourlyRateMax >= data.hourlyRateMin;
      }

      // For SALARY type, salary should be provided
      if (data.jobType === 'SALARY') {
        return data.salary !== undefined && data.salary > 0;
      }

      // For CONTRACT type, budget should be provided
      if (data.jobType === 'CONTRACT') {
        return data.budget !== undefined && data.budget > 0;
      }

      return true;
    },
    {
      message:
        'Maximum hourly rate must be greater than or equal to minimum hourly rate',
      path: ['hourlyRateMax'],
    }
  );

type FormSchema = z.infer<typeof formSchema>;

const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const parseInputDate = (dateString: string): Date => {
  return new Date(dateString);
};

export default function PostJobPage() {
  const [isOpen, setIsOpen] = useState(false);
  // const router = useRouter();
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize the form with React Hook Form
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: 'Experienced Electrician Needed for Residential Wiring',
      description:
        'Looking for a licensed electrician to help with rewiring a residential home. Tasks include installing outlets, switches, light fixtures, and ensuring all work meets safety codes. Tools and transportation required. Project expected to last 2 weeks.',
      requirements:
        '- Valid electrician license\n- 5+ years of residential wiring experience\n- Own tools and transportation\n- Availability for 2 weeks\n- Strong knowledge of local electrical codes',
      budget: 1500,
      hourlyRateMin: 25,
      hourlyRateMax: 40,
      status: 'OPEN',
      skills: [
        'QUALITY_CONTROL',
        'CODE_COMPLIANCE',
        'STRUCTURAL_ASSESSMENT',
        'INSTRUMENT_TECHNICIAN',
        'MAINTENANCE_TECHNICIAN',
        'ELECTRONICS_TECHNICIAN',
        'CALIBRATION_SPECIALIST',
      ],
      jobType: 'HOURLY',
      startDate: new Date(),
      numberOfWorkersRequired: 1,
      location: {
        city: 'New York',
        state: 'NY',
        country: 'USA',
      },
      
    },
  });

  const { mutateAsync: createJob } = useCreateJob();

  // Handle form submission
  function onSubmit(values: FormSchema) {
    const { jobType, hourlyRateMin, hourlyRateMax, budget, salary, ...commonFields } = values;

    let jobData;
    if (jobType === 'HOURLY') {
      jobData = {
        ...commonFields,
        hourlyRateMin: hourlyRateMin!,
        hourlyRateMax: hourlyRateMax!,
      };
    } else if (jobType === 'CONTRACT') {
      jobData = {
        ...commonFields,
        budget: budget!,
      };
    } else {
      // SALARY
      jobData = {
        ...commonFields,
        salary: salary!,
      };
    }

    createJob({ ...jobData, jobType });
  }

  const handleSkillSelect = (value: string) => {
    const currentSkills = form.getValues('skills') || [];
    if (currentSkills.length < 8 && !currentSkills.includes(value)) {
      form.setValue('skills', [...currentSkills, value]);
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    const currentSkills = form.getValues('skills') || [];
    form.setValue(
      'skills',
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
          <CardDescription>
            Fill out the form below to post a new job opportunity for
            freelancers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Senior React Developer"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A clear and concise title for the job position.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the job responsibilities, requirements, and any other relevant details..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of the job, including
                      responsibilities and requirements.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List the required qualifications, experience, certifications, etc..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      List all mandatory and preferred requirements for the
                      position.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(JobStatus).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The current status of the job posting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HOURLY">Hourly</SelectItem>
                        <SelectItem value="SALARY">Salary</SelectItem>
                        <SelectItem value="CONTRACT">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The type of employment for this position.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch('jobType') === 'HOURLY' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="hourlyRateMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Hourly Rate</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 25"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          The minimum hourly rate for the job.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hourlyRateMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Hourly Rate</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 50"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          The maximum hourly rate for the job.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {form.watch('jobType') === 'SALARY' && (
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Salary</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g. 75000"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        The annual salary for this position.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {form.watch('jobType') === 'CONTRACT' && (
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Budget</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g. 5000"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        The total budget for this contract.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Required Skills</FormLabel>
                    <FormControl>
                      <div ref={commandRef}>
                        <Command className="border rounded-md py-1">
                          <CommandInput
                            placeholder="Search skills..."
                            onFocus={() => setIsOpen(true)}
                          />
                          {isOpen && (
                            <CommandList>
                              <CommandEmpty>No skills found.</CommandEmpty>
                              <CommandGroup className="max-h-[200px] overflow-auto border-t">
                                {workerData.skills.map((skill) => (
                                  <CommandItem
                                    key={skill.value}
                                    value={skill.value}
                                    onSelect={() => {
                                      handleSkillSelect(skill.value);
                                      if (field.value?.length === 8) {
                                        setIsOpen(false);
                                      }
                                    }}
                                    className="flex items-center justify-between"
                                  >
                                    <span>{skill.label}</span>
                                    {field.value?.includes(skill.value) && (
                                      <Check className="h-4 w-4 text-nixerly-blue" />
                                    )}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          )}
                        </Command>
                      </div>
                    </FormControl>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value?.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="px-3 py-2"
                        >
                          {
                            workerData.skills.find((s) => s.value === skill)
                              ?.label
                          }
                          <button
                            type="button"
                            onClick={() => handleSkillRemove(skill)}
                            className="ml-2 hover:text-nixerly-coral cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <FormDescription>
                      Select up to 8 skills that are required for this job
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={formatDateForInput(field.value)}
                          onChange={(e) =>
                            field.onChange(parseInputDate(e.target.value))
                          }
                          className="w-full"
                        />
                      </FormControl>
                      <FormDescription>
                        When the job should start. Select today for immediate
                        start.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numberOfWorkersRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Professionals Required</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="e.g. 1"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        How many professionals do you need for this job?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <div className="space-y-4">
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <LocationSearch
                          onLocationSelect={(location) => {
                            field.onChange({
                              ...field.value,
                              city: location.city,
                              state: location.state,
                              country: location.country,
                            });
                          }}
                          defaultValue={`${field.value.city}, ${field.value.state}, ${field.value.country}`}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the city, state, and country for this job
                      </FormDescription>
                      <FormMessage />
                    </FormItem>

                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter street address"
                          value={field.value.street || ''}
                          onChange={(e) =>
                            field.onChange({
                              ...field.value,
                              street: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter postal code"
                          value={field.value.postalCode || ''}
                          onChange={(e) =>
                            field.onChange({
                              ...field.value,
                              postalCode: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />

              <Button type="submit" className="w-full bg-blue-600">
                Post Job
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
