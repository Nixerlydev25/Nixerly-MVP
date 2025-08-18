import { EditPortfolioForm } from "@/components/forms/edit-portfolio-form";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useModalStore } from "@/store/modal.store";
import type { PortfolioModalData } from "@/store/modal.store";
import { Separator } from "../ui/separator";
import Image from "next/image";

export function EditPortfolioModal() {
  const { closeModal, modalData } = useModalStore();
  const portfolioData = modalData as PortfolioModalData;

  return (
    <Dialog open onOpenChange={closeModal} >
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
        <DialogHeader>
        <div className="flex flex-row items-center gap-3">
        <div className="flex items-center justify-center p-3 lg:p-4 border border-gray-300 rounded-full">
            <Image src="/edit.svg" alt='edit' width={20} height={20}/>
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