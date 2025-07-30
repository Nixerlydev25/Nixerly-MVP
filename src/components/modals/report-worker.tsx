"use client";

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
import { useHasBusinessReportedWorker } from "@/hook/report/report.hooks";
import { ReportWorkerForm } from "../forms/report-worker-form";
import Image from "next/image";
import { Separator } from "../ui/separator";

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
      <DialogContent className="sm:max-w-[520px] gap-0">
      <DialogHeader className="flex flex-row items-center gap-3">
      <div className="flex items-center justify-center p-4 border border-gray-300 rounded-full bg-white">
            <Image
              src="/reports.svg"
              alt="report"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <div className="space-y-2">
          <DialogTitle>Report Professional</DialogTitle>
          <DialogDescription className="pr-2 leading-5 text-sm" >Help us keep this space safe and respectful by reporting any content that doesn't feel right. </DialogDescription>
        </div>
        </DialogHeader>
        <Separator/>
        {hasAlreadyReported ? (
          <div className=" px-4 pt-4">
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <AlertTitle className="text-yellow-800">
                Already Reported
              </AlertTitle>
              <AlertDescription className="text-yellow-700">
                You have already submitted a report for this Professional.
              </AlertDescription>
            </Alert>
            <div className="flex justify-end py-4">
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
