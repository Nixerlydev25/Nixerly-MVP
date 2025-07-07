"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { useHasBusinessReportedWorker } from "@/hook/report/report.hooks";
import { ReportWorkerForm } from "../forms/report-worker-form";

export function ReportWorkerModal() {
  const { activeModal, modalData, closeModal } = useModalStore();
  // const isOpen = activeModal === ModalType.REPORT_WORKER_MODAL;
  const isOpen = activeModal === ModalType.REPORT_WORKER_MODAL;
  const { targetId = "" } = (modalData || {}) as {
    targetId: string;
    targetName: string;
  };
  const { data } = useHasBusinessReportedWorker(targetId);
  const hasAlreadyReported = data?.data;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
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
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <ReportWorkerForm targetId={targetId} onSuccess={closeModal} />
        )}
      </DialogContent>
    </Dialog>
  );
}
