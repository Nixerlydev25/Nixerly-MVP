"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EditEducationForm } from "@/components/forms/edit-education-form"
import { useModalStore } from "@/store/modal.store"
import { WorkerProfile } from "@/types/worker.types"
import { ModalType } from "@/types/model"
import { useUpdateAllEducation } from "@/hook/educations/educations.hook"
// import { useUpdateAllEducation } from "@/hook/educations/educations.hook" // implement this hook as needed

interface EducationFormData {
  id?: string
  school: string
  degree: string
  fieldOfStudy: string
  startDate: Date
  endDate?: Date
  description?: string
  currentlyStudying: boolean
}


type FormValues = {
  education: EducationFormData[]
}

export function EditEducationModal() {
  const { activeModal, modalData, closeModal } = useModalStore()
  const { mutateAsync: updateEducation } = useUpdateAllEducation()
  const isOpen = activeModal === ModalType.EDIT_EDUCATION
  const profile = modalData as WorkerProfile

  const handleSubmit = async (values: FormValues) => {
    try {
      await updateEducation(values.education)
      closeModal()
    } catch (error) {
      console.error("Error updating education:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Education</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto pr-6 -mr-6">
          <EditEducationForm
            onSubmit={handleSubmit}
            defaultValues={{
              education: profile?.education || [],
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
} 