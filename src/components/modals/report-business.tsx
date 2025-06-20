'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { useHasWorkerReportedBusiness } from "@/hook/report/report.hooks";
import { ReportBusinessForm } from "../forms/report-business-form";

export function ReportBusinessModal() {
  const { activeModal, modalData, closeModal } = useModalStore();
  const isOpen = activeModal === ModalType.REPORT_BUSINESS_MODAL;
  const { targetId = "", targetName = "" } = (modalData || {}) as {
    targetId: string;
    targetName: string;
  };
  const { data } = useHasWorkerReportedBusiness(targetId);
  const hasAlreadyReported = data?.data || false;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
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
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <ReportBusinessForm targetId={targetId} onSuccess={closeModal} />
        )}
      </DialogContent>
    </Dialog>
  );
}
