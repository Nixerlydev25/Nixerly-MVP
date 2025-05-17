"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EditSkillsForm } from "@/components/forms/edit-skills-form"
import { useModalStore } from "@/store/modal.store"
import { WorkerProfile } from "@/types/worker.types"
import { ModalType } from "@/types/model"
import { useUpdateSkills } from "@/hook/skills/skills.hook"

type FormValues = {
  skills: string[]
}

export function EditSkillsModal() {
  const { activeModal, modalData, closeModal } = useModalStore()
  const { mutateAsync: updateSkills } = useUpdateSkills()
  const isOpen = activeModal === ModalType.EDIT_SKILLS
  const profile = modalData as WorkerProfile

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
        <DialogHeader>
          <DialogTitle>Edit Skills</DialogTitle>
        </DialogHeader>
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