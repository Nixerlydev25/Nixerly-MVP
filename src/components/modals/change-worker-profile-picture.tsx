"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useModalStore } from "@/store/modal.store"
import type { WorkerProfile } from "@/types/worker.types"
import { ModalType } from "@/types/model"
import { ChangeWorkerProfilePictureForm } from "../forms/change-worker-profile-picture"
import { Separator } from "../ui/separator"
import { CameraIcon } from "lucide-react"

export function ChangeWorkerProfilePictureModal() {
  const { activeModal, modalData, closeModal } = useModalStore()
  const isOpen = activeModal === ModalType.CHANGE_PROFILE_PICTURE
  const profile = modalData as unknown as WorkerProfile

  const handleProfilePictureChange = (newImageUrl: string) => {
    console.log(newImageUrl)
    // This function will be called after successful upload
    // You might want to update the global state or refetch the profile data
    closeModal()
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="p-4 flex flex-row">
          <div className="flex items-center h-12 w-16 justify-center border border-gray-300 rounded-full">
            <CameraIcon className="w-5 h-5" />
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
          <ChangeWorkerProfilePictureForm
            currentProfilePicture={profile?.profilePicture || ""}
            onProfilePictureChange={handleProfilePictureChange}
            onClose={closeModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
