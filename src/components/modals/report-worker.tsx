"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Info, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { useHasBusinessReportedWorker } from "@/hook/report/report.hooks";
import { ReportWorkerForm } from "../forms/report-worker-form";

export function ReportWorkerModal() {
  const { activeModal, modalData, closeModal } = useModalStore();
  const isOpen = activeModal === ModalType.REPORT_WORKER_MODAL;
  const { targetId = "", targetName = "" } = (modalData || {}) as {
    targetId: string;
    targetName: string;
  };
  const { data } = useHasBusinessReportedWorker(targetId);
  const hasAlreadyReported = data?.data;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="p-6 border-b">
          <div className="flex items-start gap-3">


  <div className="h-12 w-12 flex items-center justify-center rounded-full border border-gray-300">
  <div className=" rounded-full p-3">
    <Info className="h-6 w-6 text-nixerly-blue" />
  </div>
</div>
            <div>
              <DialogTitle className="text-base font-semibold text-gray-900">
                Report Professional
              </DialogTitle>
              <DialogDescription className="text-sm text-nixerly-businesslabel">
              Help keep this space safe by reporting inappropriate content.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {hasAlreadyReported ? (
          <div className="p-6">
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <AlertTitle className="text-yellow-800">Already Reported</AlertTitle>
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
          <div className="">
            <ReportWorkerForm targetId={targetId} onSuccess={closeModal} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
