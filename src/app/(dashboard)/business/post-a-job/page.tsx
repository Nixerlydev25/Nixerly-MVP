"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useRef, useEffect } from "react";
import {
  Check,
  X,
  Briefcase,
  DollarSign,
  MapPin,
  Calendar,
  FileText,
} from "lucide-react";
import workerData from "@/data/onboarding/worker.json";
import { useCreateJob } from "@/hook/jobs/jobs.hooks";
import { LocationSearch } from "@/components/location-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePicker } from "@/components/ui/date-picker";

const formSchema = z
  .object({
    title: z
      .string()
      .min(5, { message: "Title must be at least 5 characters" })
      .max(100, { message: "Title must be less than 100 characters" }),
    description: z
      .string()
      .min(20, { message: "Description must be at least 20 characters" }),
    requirements: z
      .string()
      .min(20, { message: "Requirements must be at least 20 characters" }),
    budget: z
      .number()
      .positive({ message: "Budget must be a positive number" })
      .optional(),
    hourlyRateMin: z
      .number()
      .positive({ message: "Minimum hourly rate must be a positive number" })
      .optional(),
    hourlyRateMax: z
      .number()
      .positive({ message: "Maximum hourly rate must be a positive number" })
      .optional(),
    salary: z
      .number()
      .positive({ message: "Salary must be a positive number" })
      .optional(),
    status: z.enum(["OPEN", "CLOSED", "FILLED", "EXPIRED"], {
      required_error: "Please select a job status",
    }),
    skills: z
      .array(z.string())
      .min(1, { message: "Please select at least one skill" }),
    jobType: z.enum(["HOURLY", "SALARY", "CONTRACT"], {
      required_error: "Please select a job type",
    }),
    startDate: z.date({
      required_error: "Please select a start date",
    }),
    numberOfWorkersRequired: z.number().int().positive({
      message: "Number of professionals must be a positive integer",
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
      if (data.jobType === "HOURLY") {
        return (
          data.hourlyRateMin !== undefined &&
          data.hourlyRateMax !== undefined &&
          data.hourlyRateMax >= data.hourlyRateMin
        );
      }

      if (data.jobType === "SALARY") {
        return data.salary !== undefined && data.salary > 0;
      }

      if (data.jobType === "CONTRACT") {
        return data.budget !== undefined && data.budget > 0;
      }

      return true;
    },
    {
      message:
        "Maximum hourly rate must be greater than or equal to minimum hourly rate",
      path: ["hourlyRateMax"],
    }
  );

type FormSchema = z.infer<typeof formSchema>;

const SectionHeader = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default function PostJobPage() {
  const [isOpen, setIsOpen] = useState(false);
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Experienced Electrician Needed for Residential Wiring",
      description:
        "Looking for a licensed electrician to help with rewiring a residential home. Tasks include installing outlets, switches, light fixtures, and ensuring all work meets safety codes. Tools and transportation required. Project expected to last 2 weeks.",
      requirements:
        "- Valid electrician license\n- 5+ years of residential wiring experience\n- Own tools and transportation\n- Availability for 2 weeks\n- Strong knowledge of local electrical codes",
      budget: 1500,
      hourlyRateMin: 25,
      hourlyRateMax: 40,
      status: "OPEN",
      skills: [
        "QUALITY_CONTROL",
        "CODE_COMPLIANCE",
        "STRUCTURAL_ASSESSMENT",
        "INSTRUMENT_TECHNICIAN",
        "MAINTENANCE_TECHNICIAN",
        "ELECTRONICS_TECHNICIAN",
        "CALIBRATION_SPECIALIST",
      ],
      jobType: "HOURLY",
      startDate: new Date(),
      numberOfWorkersRequired: 1,
      location: {
        city: "New York",
        state: "NY",
        country: "USA",
      },
    },
  });

  const { mutateAsync: createJob, isPending } = useCreateJob();

  function onSubmit(values: FormSchema) {
    const {
      jobType,
      hourlyRateMin,
      hourlyRateMax,
      budget,
      salary,
      ...commonFields
    } = values;

    let jobData;
    if (jobType === "HOURLY") {
      jobData = {
        ...commonFields,
        hourlyRateMin: hourlyRateMin!,
        hourlyRateMax: hourlyRateMax!,
      };
    } else if (jobType === "CONTRACT") {
      jobData = {
        ...commonFields,
        budget: budget!,
      };
    } else {
      jobData = {
        ...commonFields,
        salary: salary!,
      };
    }

    createJob({ ...jobData, jobType });
  }

  const handleSkillSelect = (value: string) => {
    const currentSkills = form.getValues("skills") || [];
    if (currentSkills.length < 8 && !currentSkills.includes(value)) {
      form.setValue("skills", [...currentSkills, value]);
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    const currentSkills = form.getValues("skills") || [];
    form.setValue(
      "skills",
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleJobTypeChange = (value: string) => {
    // Reset all rate/budget/salary fields when job type changes
    form.setValue("hourlyRateMin", undefined);
    form.setValue("hourlyRateMax", undefined);
    form.setValue("budget", undefined);
    form.setValue("salary", undefined);
    
    // Set the new job type
    form.setValue("jobType", value as "HOURLY" | "SALARY" | "CONTRACT");
  };

  return (
    <div className="min-h-screen bg-nixerly-form-gradient py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-8">
            <h1 className="text-4xl font-title text-gray-900 mb-2">
              Post a New Job
            </h1>
            <p className="text-lg text-gray-600">
              Create a detailed job posting to attract the best talent for your
              project. Fill out each section carefully to get quality
              applications.
            </p>
          </div>

          <div className="bg-white/60 p-8 border border-white/20 rounded-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-12"
              >
                <div>
                  <SectionHeader
                    icon={FileText}
                    title="Job Details"
                    description="Provide the basic information about your job posting"
                  />

                  <div className="space-y-6 pl-13">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Job Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Senior React Developer"
                              className="h-12 text-base"
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
                          <FormLabel className="text-base font-medium">
                            Job Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the job responsibilities, requirements, and other relevant details..."
                              className="min-h-32 text-base"
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
                          <FormLabel className="text-base font-medium">
                            Job Requirements
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List the required qualifications, experience, certifications, etc..."
                              className="min-h-32 text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            List all mandatory and preferred requirements for
                            the position.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator className="my-8" />

                <div>
                  <SectionHeader
                    icon={DollarSign}
                    title="Compensation & Job Type"
                    description="Define the employment type and compensation structure"
                  />

                  <div className="space-y-6 pl-13">
                    <FormField
                      control={form.control}
                      name="jobType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Job Type
                          </FormLabel>
                          <Tabs
                            defaultValue={field.value}
                            onValueChange={handleJobTypeChange}
                            className="w-full"
                          >
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="HOURLY">Hourly</TabsTrigger>
                              <TabsTrigger value="SALARY">Salary</TabsTrigger>
                              <TabsTrigger value="CONTRACT">Contract</TabsTrigger>
                            </TabsList>

                            <TabsContent value="HOURLY">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <FormField
                                  control={form.control}
                                  name="hourlyRateMin"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-base font-medium">
                                        Minimum Hourly Rate
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          placeholder="e.g. 25"
                                          className="h-12 text-base"
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
                                      <FormLabel className="text-base font-medium">
                                        Maximum Hourly Rate
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          placeholder="e.g. 50"
                                          className="h-12 text-base"
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
                            </TabsContent>

                            <TabsContent value="SALARY">
                              <div className="mt-4">
                                <FormField
                                  control={form.control}
                                  name="salary"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-base font-medium">
                                        Annual Salary
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          placeholder="e.g. 75000"
                                          className="h-12 text-base"
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
                              </div>
                            </TabsContent>

                            <TabsContent value="CONTRACT">
                              <div className="mt-4">
                                <FormField
                                  control={form.control}
                                  name="budget"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-base font-medium">
                                        Total Budget
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          placeholder="e.g. 5000"
                                          className="h-12 text-base"
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
                              </div>
                            </TabsContent>
                          </Tabs>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator className="my-8" />

                <div>
                  <SectionHeader
                    icon={Briefcase}
                    title="Skills & Expertise"
                    description="Select the skills and expertise required for this position"
                  />

                  <div className="pl-13">
                    <div className="mb-4">
                    </div>

                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Required Skills
                          </FormLabel>
                          <FormControl>
                            <div ref={commandRef}>
                              <Command className="border rounded-lg">
                                <CommandInput
                                  placeholder="Search skills..."
                                  onFocus={() => setIsOpen(true)}
                                  className="h-12 text-base"
                                />
                                {isOpen && (
                                  <CommandList>
                                    <CommandEmpty>
                                      No skills found.
                                    </CommandEmpty>
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
                                          className="flex items-center justify-between py-3"
                                        >
                                          <span>{skill.label}</span>
                                          {field.value?.includes(
                                            skill.value
                                          ) && (
                                            <Check className="h-4 w-4 text-blue-600" />
                                          )}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                )}
                              </Command>
                            </div>
                          </FormControl>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {field.value?.map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="px-4 py-2 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100"
                              >
                                {
                                  workerData.skills.find(
                                    (s) => s.value === skill
                                  )?.label
                                }
                                <button
                                  type="button"
                                  onClick={() => handleSkillRemove(skill)}
                                  className="ml-2 hover:text-red-600 cursor-pointer"
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
                  </div>
                </div>

                <Separator className="my-8" />

                <div>
                  <SectionHeader
                    icon={Calendar}
                    title="Timeline & Team Size"
                    description="Set the project timeline and team requirements"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-13">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Start Date
                          </FormLabel>
                          <FormControl>
                            <DatePicker
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </FormControl>
                          <FormDescription>
                            When the job should start. Select today for
                            immediate start.
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
                          <FormLabel className="text-base font-medium">
                            Number of Professionals Required
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              placeholder="e.g. 1"
                              className="h-12 text-base"
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
                </div>

                <Separator className="my-8" />

                <div>
                  <SectionHeader
                    icon={MapPin}
                    title="Job Location"
                    description="Specify where the work will be performed"
                  />

                  <div className="space-y-6 pl-13">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <div className="space-y-6">
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              City, State, Country
                            </FormLabel>
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

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormItem>
                              <FormLabel className="text-base font-medium">
                                Street Address (Optional)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter street address"
                                  className="h-12 text-base"
                                  value={field.value.street || ""}
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
                              <FormLabel className="text-base font-medium">
                                Postal Code (Optional)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter postal code"
                                  className="h-12 text-base"
                                  value={field.value.postalCode || ""}
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
                        </div>
                      )}
                    />
                  </div>
                </div>

                <div className="pt-8 flex justify-end">
                  <Button
                    type="submit"
                    className="text-md font-semibold py-6 px-6"
                    disabled={isPending}
                  >
                    Post Job
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
