'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { useHasWorkerReportedBusiness, useReportBusiness } from '@/hook/report/report.hooks';
import { BusinessReportReason } from '@/types/report.types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const reportFormSchema = z.object({
  reason: z.nativeEnum(BusinessReportReason, {
    required_error: 'Please select a report reason',
  }),
  description: z
    .string()
    .min(10, 'Please provide at least 10 characters of detail')
    .max(1000, 'Details must not exceed 1000 characters'),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

export function ReportBusinessModal() {
  const { activeModal, modalData, closeModal } = useModalStore();
  const isOpen = activeModal === ModalType.REPORT_BUSINESS_MODAL;
  const { targetId = '', targetName = '' } = (modalData || {}) as {
    targetId: string;
    targetName: string;
  };
  const {
    mutateAsync: reportBusiness,
    isSuccess: isReportBusinessSuccess,
    error: reportBusinessError,
  } = useReportBusiness();
  const {data} = useHasWorkerReportedBusiness(targetId)
  const hasAlreadyReported = data?.data || false

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      reason: BusinessReportReason.OTHER,
      description: '',
    },
  });

  const onSubmit = async (values: ReportFormValues) => {
    await reportBusiness({
      businessId: targetId,
      data: values,
    });

    closeModal();
  };

  const handleClose = () => {
    if (!isReportBusinessSuccess) {
      closeModal();
      form.reset();
    }
  };

  const reasonLabels: Record<BusinessReportReason, string> = {
    PAYMENT_ISSUES: 'Payment Issue',
    HARASSMENT: 'Harassment',
    DISCRIMINATION: 'Discrimination',
    FRAUDULENT_ACTIVITY: 'Fraudulent Activity',
    UNPROFESSIONAL_CONDUCT: 'Unprofessional Conduct',
    MISLEADING_JOB_DESCRIPTION: 'Misleading Job Description',
    VIOLATION_OF_TERMS: 'Violation of Terms',
    POOR_COMMUNICATION: 'Poor Communication',
    SCAM: 'Scam',
    OTHER: 'Other',
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Report Business</DialogTitle>
          <DialogDescription>
            Report inappropriate behavior or content from {targetName}. Your
            report will be reviewed by our team.
          </DialogDescription>
        </DialogHeader>

        {hasAlreadyReported ? (
          <div className="py-6">
            <Alert className="bg-yellow-50 border-yellow-200">
              <CheckCircle className="h-5 w-5 text-yellow-600" />
              <AlertTitle className="text-yellow-800">
                Report Submitted
              </AlertTitle>
              <AlertDescription className="text-yellow-700">
              You have already submitted a report for this Business.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are you reporting?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(reasonLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
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
                  <FormItem className="space-y-2">
                    <FormLabel>Additional details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide specific details about your report..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {reportBusinessError?.message && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {reportBusinessError?.message}
                  </AlertDescription>
                </Alert>
              )}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isReportBusinessSuccess}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isReportBusinessSuccess}>
                  {isReportBusinessSuccess ? 'Submitting...' : 'Submit Report'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
