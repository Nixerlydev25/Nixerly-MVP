"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useModalStore } from "@/store/modal.store"
import type { WorkerProfile } from "@/types/worker.types"
import { ModalType } from "@/types/model"
import { ChangeWorkerProfilePictureForm } from "../forms/change-worker-profile-picture"

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
        <DialogHeader>
          <DialogTitle>Change Profile Picture</DialogTitle>
        </DialogHeader>
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
