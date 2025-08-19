"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { ChangeBusinessProfilePictureForm } from "../forms/change-business-profile-picture";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { CameraIcon } from "lucide-react";

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
        <DialogHeader className="p-4 flex flex-row">
          <div className="flex items-center h-12 w-16 justify-center border border-gray-300 rounded-full">
            <CameraIcon className="w-5 h-5"/>
          </div>
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-nixerly-blue">Change Profile Picture</DialogTitle>
            <DialogDescription className="w-11/12">
              Upload a new profile picture. The image should be square and at least
              400x400 pixels.
            </DialogDescription>
          </div>
        </DialogHeader>
        <Separator />
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
