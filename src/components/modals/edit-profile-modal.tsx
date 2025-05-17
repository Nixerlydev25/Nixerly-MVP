"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EditProfileForm } from "@/components/forms/edit-profile-form"
import { useModalStore } from "@/store/modal.store"
import { WorkerProfile } from "@/types/worker.types"
import { ModalType } from "@/types/model"
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks"

type FormValues = {
  title: string
  description: string
  city: string
  state: string
  country: string
  hourlyRate: number
  availability: boolean
}

export function EditProfileModal() {
  const { activeModal, modalData, closeModal } = useModalStore()
  const {mutateAsync: updateWorkerProfileDetails} = useUpdateWorkerProfile()
  const isOpen = activeModal === ModalType.EDIT_PROFILE
  const profile = modalData as WorkerProfile

  const handleSubmit = async (values: FormValues) => {
    // TODO: Implement profile update
    console.log({values})
    updateWorkerProfileDetails({
      title: values.title,
      description : values.description,
      city: values.city,
      country: values.country,
      hourlyRate: values.hourlyRate,
      availability: values.availability
    })
    closeModal()
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <EditProfileForm
          onSubmit={handleSubmit}
          defaultValues={{
            title: profile?.title,
            description: profile?.description,
            city: profile?.city,
            state: profile?.state,
            country: profile?.country,
            hourlyRate: profile?.hourlyRate,
            availability: profile?.availability,
          }}
        />
      </DialogContent>
    </Dialog>
  )
} 