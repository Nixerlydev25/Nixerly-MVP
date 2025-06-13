'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { useHasWorkerReportedJob } from "@/hook/report/report.hooks";
import { ReportJobForm } from "../forms/report-job-form";

export function ReportJobModal() {
  const { activeModal, modalData, closeModal } = useModalStore();
  const isOpen = activeModal === ModalType.REPORT_JOB_MODAL;
  const { jobId = "" } = (modalData || {}) as { jobId: string };
  const { data } = useHasWorkerReportedJob(jobId);
  const hasReported = data?.data || false;

  if (hasReported) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
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
            <Button type="button" variant="outline" onClick={closeModal}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report Job</DialogTitle>
          <DialogDescription>
            Help us maintain quality by reporting inappropriate content.
          </DialogDescription>
        </DialogHeader>
        <ReportJobForm jobId={jobId} onSuccess={closeModal} />
      </DialogContent>
    </Dialog>
  );
}
