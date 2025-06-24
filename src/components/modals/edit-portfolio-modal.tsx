import { EditPortfolioForm } from "@/components/forms/edit-portfolio-form";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";

export function EditPortfolioModal() {
  const { closeModal, modalData } = useModalStore();

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
        <div className="p-6 border-b">
          <DialogTitle>Edit Portfolio</DialogTitle>
          <DialogDescription>
            Add or edit your portfolio projects to showcase your work.
          </DialogDescription>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <EditPortfolioForm
            onSuccess={() => {
              closeModal();
            }}
            portfolio={modalData?.portfolio || []}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 