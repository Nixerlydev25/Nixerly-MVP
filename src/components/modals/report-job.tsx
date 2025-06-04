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
  DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle, Flag, Loader2 } from 'lucide-react';
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
import { useReportJob } from '@/hook/report/report.hooks';
import { ReportJobsCategory } from '@/types/report.types';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  category: z.nativeEnum(ReportJobsCategory, {
    required_error: 'Please select a report category',
  }),
  reason: z.string().min(1, 'Please provide a reason'),
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

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: undefined,
      reason: '',
    },
  });

  const onSubmit = async (values: ReportFormValues) => {
    await reportJob({
      targetJobId: modalData?.jobId as string,
      ...values,
    });

    closeModal();
    form.reset();
  };

  const handleClose = () => {
    closeModal();
    form.reset();
  };

  const defaultTrigger = (
    <Button size="icon" variant="outline">
      <Flag className="h-5 w-5" />
      <span className="sr-only">Report job</span>
    </Button>
  );

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
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel>Reason for reporting</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        {Object.entries(ReportJobsCategory).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={value}
                                id={key.toLowerCase()}
                              />
                              <Label htmlFor={key.toLowerCase()}>
                                {key
                                  .split('_')
                                  .map(
                                    (word) =>
                                      word.charAt(0) +
                                      word.slice(1).toLowerCase()
                                  )
                                  .join(' ')}
                              </Label>
                            </div>
                          )
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
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
