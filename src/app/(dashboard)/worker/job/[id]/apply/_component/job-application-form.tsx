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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { applicationFormSchema, type ApplicationFormValues, durationOptions, JobApplicationDuration } from './types';

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
  hourlyRateMin?: number;
  hourlyRateMax?: number;
}

export default function JobApplicationForm({
  jobId,
  hourlyRateMin,
  hourlyRateMax,
}: JobApplicationFormProps) {
  const { mutateAsync: applyJob, isPending: isApplying } = useApplyJobs();
  const suggestedRate = hourlyRateMin && hourlyRateMax
    ? Math.floor((hourlyRateMin + hourlyRateMax) / 2)
    : 25;

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      coverLetter: 'Dear Hiring Manager,\n\nI am excited to apply for this opportunity. With my experience in web development and a strong background in delivering scalable, secure applications, I am confident in my ability to contribute effectively to your team. I am passionate about solving complex problems and delivering high-quality code.\n\nThank you for considering my application. I look forward to discussing how I can help drive success for your project.\n\nBest regards,\nJohn Doe',
      proposedRate: suggestedRate,
      duration: JobApplicationDuration.LESS_THAN_ONE_WEEK,
      termsAccepted: true,
    },
  });

  async function onSubmit(data: ApplicationFormValues) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { termsAccepted, ...submitData } = data;
    await applyJob({ id: jobId, data: submitData });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Submit a Proposal</CardTitle>
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
            </div>

            <Separator />

            {/* Payment Terms Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment Terms</h3>

              <FormField
                control={form.control}
                name="proposedRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Hourly Rate (USD)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                          $
                        </span>
                        <Input
                          type="number"
                          className="pl-7"
                          placeholder="25"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </div>
                    </FormControl>
                    {hourlyRateMin && hourlyRateMax && (
                      <FormDescription>
                        Client&apos;s budget: ${hourlyRateMin}-${hourlyRateMax}/hr
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How long will this project take?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select estimated duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {durationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              <Button type="submit" disabled={isApplying}>
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
