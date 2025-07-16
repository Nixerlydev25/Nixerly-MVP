"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EditProfileForm } from "@/components/forms/edit-profile-form"
import { useModalStore } from "@/store/modal.store"
import { WorkerProfile } from "@/types/worker.types"
import { ModalType } from "@/types/model"
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks"
import { Separator } from "../ui/separator"

type FormValues = {
  title?: string
  description?: string
  city?: string
  state?: string
  country?: string
  hourlyRate?: number | string
  availability?: boolean
}

export function EditProfileModal() {
  const { activeModal, modalData, closeModal } = useModalStore()
  const {mutateAsync: updateWorkerProfileDetails} = useUpdateWorkerProfile()
  const isOpen = activeModal === ModalType.EDIT_PROFILE
  const profile = modalData as unknown as WorkerProfile

  const handleSubmit = async (values: FormValues) => {
    // TODO: Implement profile update
    console.log({values})
    updateWorkerProfileDetails({
      title: values.title,
      description: values.description,
      city: values.city,
      country: values.country,
      hourlyRate: Number(values.hourlyRate),
      availability: values.availability
    })
    closeModal()
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="flex flex-row px-4 pt-4">
        <div className="flex items-center justify-center h-10 w-10  md:w-14 md:h-14 border border-gray-300 rounded-full">
            <span className="text-lg sm:text-base font-medium">01</span>
          </div>
          <div>
          <DialogTitle className="text-nixerly-blue mb-2">Edit Profile</DialogTitle>
          <DialogDescription>Update your business profile information. Click save  <br />
          when you're done.</DialogDescription>
          </div>
        </DialogHeader>
        <Separator/>
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