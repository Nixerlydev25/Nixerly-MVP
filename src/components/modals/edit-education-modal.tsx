"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EditEducationForm } from "@/components/forms/edit-education-form"
import { useModalStore } from "@/store/modal.store"
import { ModalType } from "@/types/model"
import { useUpdateAllEducation } from "@/hook/educations/educations.hook"
import { Separator } from "../ui/separator"
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
  const rawEducation = ((modalData as Record<string, unknown>)?.education as Array<{
    id?: string
    school: string
    degree: string
    fieldOfStudy: string
    startDate: string
    endDate?: string
    description?: string
    currentlyStudying: boolean
  }>) || []
  
  const education = rawEducation.map(edu => ({
    ...edu,
    startDate: edu.startDate,
    endDate: edu.endDate
  }))

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
        <DialogHeader className="p-4 flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10  md:w-14 md:h-14 border border-gray-300 rounded-full">
            <span className="text-lg sm:text-base font-medium">01</span>
          </div>
          <DialogTitle>Edit Education</DialogTitle>
        </DialogHeader>
        <Separator/>
        <div className="overflow-y-auto pr-6 -mr-6">
          <EditEducationForm
            onSubmit={handleSubmit}
            defaultValues={{
              education
            }}
            onCancel={closeModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
} 