'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useModalStore } from '@/store/modal.store';
import { ModalType } from '@/types/model';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useHasWorkerReportedJob, useReportJob } from '@/hook/report/report.hooks';
import { ReportJobsCategory } from '@/types/report.types';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  reason: z.nativeEnum(ReportJobsCategory, {
    required_error: 'Please select a report category',
  }),
  description: z.string().min(1, 'Please provide a reason'),
});

type ReportFormValues = z.infer<typeof formSchema>;

export function ReportJobModal() {
  const { activeModal, closeModal, modalData } = useModalStore();
  const isOpen = activeModal === ModalType.REPORT_JOB_MODAL;
  
  const {
    mutateAsync: reportJob,
    isSuccess: isReportJobSuccess,
    isPending: isReportJobPending,
    error: reportJobError,
  } = useReportJob();
  const {data} = useHasWorkerReportedJob(modalData?.jobId as string)
  const hasReported = data?.data || false

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: undefined,
      description: '',
    },
  });

  const onSubmit = async (values: ReportFormValues) => {
    await reportJob({
      data : values,
      jobId: modalData?.jobId as string,
    });

    closeModal();
    form.reset();
  };

  const handleClose = () => {
    closeModal();
    form.reset();
  };

  if (hasReported) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Report Job</DialogTitle>
          </DialogHeader>
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Already Reported</AlertTitle>
            <AlertDescription className="text-yellow-700">
              You have already reported this job. Our team is reviewing your report.
            </AlertDescription>
          </Alert>
          <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={handleClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report Job</DialogTitle>
          <DialogDescription>
            Help us maintain quality by reporting inappropriate content.
          </DialogDescription>
        </DialogHeader>

        {isReportJobSuccess ? (
          <div className="py-6">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">
                Report Submitted
              </AlertTitle>
              <AlertDescription className="text-green-700">
                Thank you for your report. Our team will review it as soon as
                possible.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for reporting</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(ReportJobsCategory).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {key
                              .split('_')
                              .map(
                                (word) =>
                                  word.charAt(0) + word.slice(1).toLowerCase()
                              )
                              .join(' ')}
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide more details about the issue..."
                        className="mt-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {reportJobError?.message && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{reportJobError?.message}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isReportJobPending}
                  className="flex items-center gap-2"
                >
                  {isReportJobPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Submit Report'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
