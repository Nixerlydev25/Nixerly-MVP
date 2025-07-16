import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/store/modal.store';
import { ModalType } from '@/types/model';
import { EditBusinessOwnerForm, EditBusinessOwnerData } from '../forms/edit-business-owner-form';
import { useUpdateUser } from '@/hook/user/user.hooks';
import { Separator } from '../ui/separator';

export function EditBusinessOwnerModal() {
  const { mutateAsync: updateUser } = useUpdateUser();
  const { activeModal, closeModal, modalData } = useModalStore();
  const isOpen = activeModal === ModalType.EDIT_BUSINESS_OWNER;
  const profileData = modalData as EditBusinessOwnerData;

  const onSubmit = async (data: EditBusinessOwnerData) => {
    try {
      await updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
      });
      closeModal();
    } catch (error) {
      console.error('Error updating business owner:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader className="flex flex-row items-center gap-3 px-6 pt-6">
          <div className="flex items-center justify-center h-10 w-10 md:w-14 md:h-14 border border-gray-300 rounded-full">
            <span className="text-lg sm:text-base font-medium">01</span>
          </div>
          <div>
            <DialogTitle className="text-nixerly-blue mb-1 text-start">
              Edit Business Owner
            </DialogTitle>
            <DialogDescription className="w-4/5">
              Update the business owner&apos;s name. Click save when you&apos;re done.
            </DialogDescription>
          </div>
        </DialogHeader>
        <Separator />
        <EditBusinessOwnerForm
          onSubmit={onSubmit}
          onCancel={closeModal}
          defaultValues={profileData}
        />
      </DialogContent>
    </Dialog>
  );
} 