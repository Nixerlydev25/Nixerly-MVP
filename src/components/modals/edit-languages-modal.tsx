"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditLanguagesForm } from "@/components/forms/edit-languages-form";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { useUpdateAllLanguages } from "@/hook/langauge/language.hook";
import { toast } from "sonner";
import { LanguageSchema } from "@/schema/onboarding/worker-onboarding.schema";
import { z } from "zod";
import { Separator } from "../ui/separator";

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
        <DialogHeader className="p-4 flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10  md:w-14 md:h-14 border border-gray-300 rounded-full">
            <span className="text-lg sm:text-base font-medium">01</span>
          </div>
          <div>
          <DialogTitle className="text-nixerly-blue mb-2">Edit Languages</DialogTitle>
          <DialogDescription>Please Provide the Following Information To get Started</DialogDescription>
          </div>
        </DialogHeader>
        <Separator/>
        <EditLanguagesForm
          onSubmit={handleSubmit}
          defaultValues={{ languages }}
          onCancel={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
} 



