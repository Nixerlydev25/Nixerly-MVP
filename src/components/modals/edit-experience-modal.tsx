"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog"
import { EditExperienceForm } from "@/components/forms/edit-experience-form"
import { useModalStore } from "@/store/modal.store"
import { WorkerProfile } from "@/types/worker.types"
import { ModalType } from "@/types/model"
import { useUpdateAllExperience } from "@/hook/experiences/experiences.hook"
import { Separator } from "../ui/separator"

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
          <DialogHeader className="flex flex-row items-center gap-2">
            <div className="flex items-center justify-center h-10 w-10  md:w-14 md:h-14 border border-gray-300 rounded-full">
              <span className="text-lg sm:text-base font-medium">01</span>
            </div>
            <DialogTitle>Edit Experience</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="overflow-y-auto pr-6 -mr-6">
            <EditExperienceForm
              onSubmit={handleSubmit}
              defaultValues={{
                experience: profile?.experience || [],
              }}
              onCancel={closeModal}
            />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
} 
