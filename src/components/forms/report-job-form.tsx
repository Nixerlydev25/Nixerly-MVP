"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useReportJob } from "@/hook/report/report.hooks";
import { ReportJobsCategory } from "@/types/report.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  reason: z.nativeEnum(ReportJobsCategory, {
    required_error: "Please select a report category",
  }),
  description: z.string().min(1, "Please provide a reason"),
});

type ReportFormValues = z.infer<typeof formSchema>;

interface ReportJobFormProps {
  jobId: string;
  onSuccess?: () => void;
}

export function ReportJobForm({ jobId, onSuccess }: ReportJobFormProps) {
  const {
    mutateAsync: reportJob,
    isSuccess: isReportJobSuccess,
    isPending: isReportJobPending,
    error: reportJobError,
  } = useReportJob();

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: undefined,
      description: "",
    },
  });

  const onSubmit = async (values: ReportFormValues) => {
    await reportJob({
      data: values,
      jobId,
    });
    onSuccess?.();
  };

  return (
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
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0) + word.slice(1).toLowerCase()
                        )
                        .join(" ")}
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
          <Button
            type="submit"
            disabled={isReportJobPending}
            className="flex items-center gap-2"
          >
            {isReportJobPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit Report"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
} 