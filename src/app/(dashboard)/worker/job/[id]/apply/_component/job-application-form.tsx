'use client';

import type React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { useApplyJobs } from '@/hook/jobs/jobs.hooks';
import { applicationFormSchema, type ApplicationFormValues } from './types';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

enum JobApplicationDuration {
  LESS_THAN_ONE_WEEK = 'LESS_THAN_ONE_WEEK',
  ONE_2_TWO_WEEKS = 'ONE_2_TWO_WEEKS',
  TWO_2_FOUR_WEEKS = 'TWO_2_FOUR_WEEKS',
  ONE_2_THREE_MONTHS = 'ONE_2_THREE_MONTHS',
  MORE_THAN_THREE_MONTHS = 'MORE_THAN_THREE_MONTHS',
}

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
}

export default function JobApplicationForm({
  jobId,
}: // hourlyRateMin,
// hourlyRateMax,
JobApplicationFormProps) {
  const { mutateAsync: applyJob, isPending: isApplying } = useApplyJobs();
  const router = useRouter();
  // const suggestedRate =
  //   hourlyRateMin && hourlyRateMax
  //     ? Math.floor((hourlyRateMin + hourlyRateMax) / 2)
  //     : 25;

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      coverLetter:
        'Dear Hiring Manager,\n\nI am excited to apply for this opportunity. With my experience in web development and a strong background in delivering scalable, secure applications, I am confident in my ability to contribute effectively to your team. I am passionate about solving complex problems and delivering high-quality code.\n\nThank you for considering my application. I look forward to discussing how I can help drive success for your project.\n\nBest regards,\nJohn Doe',
      proposedRate: 0,
      // availability: new Date(),
      termsAccepted: true,
    },
  });

  async function onSubmit(data: ApplicationFormValues) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { termsAccepted, ...submitData } = data;
    await applyJob(
      { id: jobId, data: submitData },
      {
        onSuccess: () => {
          toast.success('Application submitted successfully');
          router.push(ROUTES.APPLIED_JOBS);
        },
        onError: () => {
          toast.error('Failed to submit application');
        },
      }
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-600"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="currentColor"
              fillOpacity="0.1"
            />
            <polyline
              points="14,2 14,8 20,8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="16"
              y1="13"
              x2="8"
              y2="13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="16"
              y1="17"
              x2="8"
              y2="17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="10,9 9,9 8,9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <CardTitle className="text-2xl flex items-center justify-center gap-2">Submit a Proposal</CardTitle>
        <p className="text-muted-foreground mt-2">Complete the sections below to submit your job application</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Cover Letter / Proposal Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Proposal</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">Help</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Explain why you&apos;re the best fit for this job.
                        Highlight your relevant experience and skills.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Introduce yourself and explain why you're a good fit for this job..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The client will see this first. Include your relevant
                      experience and skills.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      How soon are you available for the Job?
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon />
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(date?.toISOString())
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Job Duration</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value={JobApplicationDuration.LESS_THAN_ONE_WEEK}
                          >
                            Less than 1 week
                          </SelectItem>
                          <SelectItem
                            value={JobApplicationDuration.ONE_2_TWO_WEEKS}
                          >
                            1 to 2 weeks
                          </SelectItem>
                          <SelectItem
                            value={JobApplicationDuration.TWO_2_FOUR_WEEKS}
                          >
                            2 to 4 weeks
                          </SelectItem>
                          <SelectItem
                            value={JobApplicationDuration.ONE_2_THREE_MONTHS}
                          >
                            1 to 3 months
                          </SelectItem>
                          <SelectItem
                            value={
                              JobApplicationDuration.MORE_THAN_THREE_MONTHS
                            }
                          >
                            More than 3 months
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I agree to the terms and conditions</FormLabel>
                    <FormDescription>
                      By submitting this proposal, you agree to our{' '}
                      <a href="#" className="text-primary underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-primary underline">
                        Privacy Policy
                      </a>
                      .
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="flex justify-end gap-4 px-0">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isApplying}
                className="bg-blue-700 text-white hover:bg-blue-800"
              >
                {isApplying && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit Proposal
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
