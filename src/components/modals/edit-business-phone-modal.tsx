"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useModalStore } from "@/store/modal.store";
import { EditBusinessPhoneForm } from "@/components/forms/edit-business-phone-form";

interface BusinessPhoneModalData {
  phoneNumber?: string;
}

export const EditBusinessPhoneModal = () => {
  const { closeModal, modalData } = useModalStore();
  const typedModalData = modalData as BusinessPhoneModalData;

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-nixerly-blue">Update Phone Number</DialogTitle>
        </DialogHeader>
        <EditBusinessPhoneForm 
          initialPhoneNumber={typedModalData?.phoneNumber}
          onSuccess={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
}; 