import { EditPortfolioForm } from "@/components/forms/edit-portfolio-form";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useModalStore } from "@/store/modal.store";
import type { PortfolioModalData } from "@/store/modal.store";
import { Separator } from "../ui/separator";

export function EditPortfolioModal() {
  const { closeModal, modalData } = useModalStore();
  const portfolioData = modalData as PortfolioModalData;

  return (
    <Dialog open onOpenChange={closeModal} >
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
        <DialogHeader>
        <div className="flex flex-row items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10  md:w-14 md:h-14 border border-gray-300 rounded-full">
            <span className="text-lg sm:text-base font-medium">01</span>
          </div>
          <div>
          <DialogTitle>Edit Portfolio</DialogTitle>
          <DialogDescription className="mt-1">
            Add or edit your portfolio projects to showcase your work.
          </DialogDescription>
          </div>
        </div>
        </DialogHeader>
        <Separator/>
        <div className="flex-1 overflow-y-auto">
          <EditPortfolioForm
            onSuccess={() => {
              closeModal();
            }}
            close={closeModal}
            portfolio={portfolioData?.portfolio || []}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 