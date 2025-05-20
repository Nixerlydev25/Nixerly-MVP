'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/store/modal.store';
import { ModalType } from '@/types/model';
import { EditBusinessAboutForm } from '../forms/edit-business-about-form';
import { useUpdateBusinessProfile } from '@/hook/user/user.hooks';

export function EditAboutModal() {
  const { mutateAsync } = useUpdateBusinessProfile();
  const { activeModal, closeModal, modalData } = useModalStore();
  const isOpen = activeModal === ModalType.EDIT_BUSINESS_ABOUT;

  const onSubmit = (data: { description: string }) => {
    mutateAsync(data,  {
        onSuccess() {
            closeModal()
        }
    })
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit About Section</DialogTitle>
          <DialogDescription>
            Update your business description. This helps potential clients
            understand your services.
          </DialogDescription>
        </DialogHeader>
        <EditBusinessAboutForm
          onSubmit={onSubmit}
          defaultValues={{ description: modalData?.description || '' }}
          onCancel={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
}
