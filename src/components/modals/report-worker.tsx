"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useHasBusinessReportedWorker,
  useReportWorker,
} from "@/hook/report/report.hooks";
import { WorkerReportReason } from "@/types/report.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const reportFormSchema = z.object({
  reason: z.nativeEnum(WorkerReportReason, {
    required_error: "Please select a report reason",
  }),
  description: z
    .string()
    .min(10, "Please provide at least 10 characters of detail")
    .max(1000, "Details must not exceed 1000 characters"),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

export function ReportWorkerModal() {
  const { activeModal, modalData, closeModal } = useModalStore();
  const isOpen = activeModal === ModalType.REPORT_WORKER_MODAL;
  const { targetId = "" } = (modalData || {}) as {
    targetId: string;
    targetName: string;
  };
  const {
    mutateAsync: reportWorker,
    isSuccess: isReportWorkerSuccess,
    error: reportWorkerError,
  } = useReportWorker();
  const { data } = useHasBusinessReportedWorker(targetId);
  const hasAlreadyReported = data?.data;

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      reason: WorkerReportReason.OTHER,
      description: "",
    },
  });

  const onSubmit = async (values: ReportFormValues) => {
    await reportWorker({
      data: values,
      workerId: targetId,
    });

    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  const reasonLabels: Record<WorkerReportReason, string> = {
    INAPPROPRIATE_BEHAVIOR: "Inappropriate Behavior",
    MISREPRESENTATION_OF_SKILLS: "Misrepresentation of Skills",
    UNPROFESSIONAL_CONDUCT: "Unprofessional Conduct",
    HARASSMENT: "Harassment",
    DISCRIMINATION: "Discrimination",
    POOR_COMMUNICATION: "Poor Communication",
    NO_SHOW: "No Show",
    FRAUDULENT_ACTIVITY: "Fraudulent Activity",
    VIOLATION_OF_TERMS: "Violation of Terms",
    OTHER: "Other",
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Report Professional</DialogTitle>
        </DialogHeader>
        {hasAlreadyReported ? (
          <div className="py-6">
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <AlertTitle className="text-yellow-800">
                Already Reported
              </AlertTitle>
              <AlertDescription className="text-yellow-700">
                You have already submitted a report for this Professional.
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reason">
                            {field.value
                              ? reasonLabels[field.value as WorkerReportReason]
                              : "Select a reason"}
                          </SelectValue>
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

              {reportWorkerError?.message && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {reportWorkerError?.message}
                  </AlertDescription>
                </Alert>
              )}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isReportWorkerSuccess}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isReportWorkerSuccess}>
                  {isReportWorkerSuccess ? "Submitting..." : "Submit Report"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
