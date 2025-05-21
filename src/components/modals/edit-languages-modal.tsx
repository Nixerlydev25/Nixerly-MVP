"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditLanguagesForm } from "@/components/forms/edit-languages-form";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { useUpdateAllLanguages } from "@/hook/langauge/language.hook";
import { toast } from "sonner";
import { LanguageSchema } from "@/schema/onboarding/worker-onboarding.schema";
import { z } from "zod";

type LanguageFormData = z.infer<typeof LanguageSchema>;

interface FormValues {
  languages: Array<LanguageFormData>;
}

export function EditLanguagesModal() {
  const { activeModal, modalData, closeModal } = useModalStore();
  const { mutateAsync: updateLanguages } = useUpdateAllLanguages();

  const languages = ((modalData as Record<string, unknown>)?.languages as Array<{ id?: string | undefined; language: string; proficiency: string }>) || []

  const isOpen = activeModal === ModalType.EDIT_LANGUAGES;

  const handleSubmit = async (data: FormValues) => {
    try {
      await updateLanguages({
        languages: data.languages
      });
      closeModal()
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("Failed to update languages");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Languages</DialogTitle>
        </DialogHeader>
        <EditLanguagesForm
          onSubmit={handleSubmit}
          defaultValues={{ languages }}
        />
      </DialogContent>
    </Dialog>
  );
} 