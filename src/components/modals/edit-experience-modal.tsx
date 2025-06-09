"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog"
import { EditExperienceForm } from "@/components/forms/edit-experience-form"
import { useModalStore } from "@/store/modal.store"
import { WorkerProfile } from "@/types/worker.types"
import { ModalType } from "@/types/model"
import { useUpdateAllExperience } from "@/hook/experiences/experiences.hook"

type FormValues = {
  experience: Array<{
    title: string
    company: string
    location: string
    country: string
    city: string
    state: string
    startDate: Date
    endDate?: Date
    description: string
    current: boolean
  }>
}

export function EditExperienceModal() {
  const { activeModal, modalData, closeModal } = useModalStore()
  const { mutateAsync: updateExperience } = useUpdateAllExperience()
  const isOpen = activeModal === ModalType.EDIT_EXPERIENCE
  const profile = modalData as unknown as WorkerProfile

  const handleSubmit = async (values: FormValues) => {
    try {
      await updateExperience(values.experience)
      closeModal()
    } catch (error) {
      console.error("Error updating experience:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Experience</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto pr-6 -mr-6">
            <EditExperienceForm
              onSubmit={handleSubmit}
              defaultValues={{
                experience: profile?.experience || [],
              }}
            />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
} 
