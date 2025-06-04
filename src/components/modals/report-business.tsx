'use client';
import { useState } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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
import { useReportBusiness } from '@/hook/report/report.hooks';
import { ReportCategory } from '@/types/report.types';

const reportFormSchema = z.object({
  category: z.nativeEnum(ReportCategory, {
    required_error: 'Please select a report category',
  }),
  reason: z
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

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      category: ReportCategory.OTHER,
      reason: '',
    },
  });

  const onSubmit = async (values: ReportFormValues) => {
    await reportBusiness({
      targetBusinessId: targetId,
      ...values,
    });

    closeModal();
  };

  const handleClose = () => {
    if (!isReportBusinessSuccess) {
      closeModal();
      form.reset();
    }
  };

  const categoryLabels: Record<ReportCategory, string> = {
    HARASSMENT: 'Harassment or Bullying',
    SPAM: 'Spam or Misleading Content',
    INAPPROPRIATE_CONTENT: 'Inappropriate Content',
    FRAUD: 'Fraud or Scam',
    FAKE_PROFILE: 'Fake Profile',
    HATE_SPEECH: 'Hate Speech',
    VIOLENCE: 'Violence or Threats',
    INTELLECTUAL_PROPERTY: 'Intellectual Property Violation',
    IMPERSONATION: 'Impersonation',
    OTHER: 'Other Issue',
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

        {isReportBusinessSuccess ? (
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-sm font-medium">
                      What are you reporting?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 gap-3 md:grid-cols-2"
                      >
                        {Object.entries(categoryLabels).map(
                          ([value, label]) => (
                            <div
                              key={value}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={value}
                                id={`category-${value}`}
                              />
                              <Label
                                htmlFor={`category-${value}`}
                                className="text-sm"
                              >
                                {label}
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
