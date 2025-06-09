"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { ChangeBusinessProfilePictureForm } from "../forms/change-business-profile-picture";

interface BusinessProfileData {
    profilePicture?: string | null;
}

export function ChangeBusinessProfilePictureModal() {
  const { activeModal, closeModal, modalData } = useModalStore();
  const isOpen = activeModal === ModalType.CHANGE_BUSINESS_PROFILE_PICTURE;
  const profileData = modalData as BusinessProfileData;
  
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Profile Picture</DialogTitle>
        </DialogHeader>
        <div>
          <ChangeBusinessProfilePictureForm
            currentProfilePicture={
              profileData?.profilePicture || ""
            }
            onClose={closeModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
