"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EditSkillsForm } from "@/components/forms/edit-skills-form"
import { useModalStore } from "@/store/modal.store"
import { WorkerProfile } from "@/types/worker.types"
import { ModalType } from "@/types/model"
import { useUpdateSkills } from "@/hook/skills/skills.hook"
import { Separator } from "../ui/separator"

type FormValues = {
  skills: string[]
}

export function EditSkillsModal() {
  const { activeModal, modalData, closeModal } = useModalStore()
  const { mutateAsync: updateSkills } = useUpdateSkills()
  const isOpen = activeModal === ModalType.EDIT_SKILLS
  const profile = modalData as unknown as WorkerProfile

  const handleSubmit = async (values: FormValues) => {
    try {
      await updateSkills({ skills: values.skills })
      closeModal()
    } catch (error) {
      console.error("Error updating skills:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="flex flex-row p-4 items-center space-x-2">
        <div className="flex items-center justify-center h-10 w-10  md:w-14 md:h-14 border border-gray-300 rounded-full">
            <span className="text-lg sm:text-base font-medium">01</span>
          </div>
          <DialogTitle className="text-nixerly-blue">Edit Skills</DialogTitle>
        </DialogHeader>
        <Separator/>
        <EditSkillsForm
          onSubmit={handleSubmit}
          defaultValues={{
            skills: profile?.skills || [],
          }}
        />
      </DialogContent>
    </Dialog>
  )
} 