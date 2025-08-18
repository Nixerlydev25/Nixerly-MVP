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
import { Separator } from '../ui/separator';
import Image from 'next/image';

export function EditAboutModal() {
  const { mutateAsync } = useUpdateBusinessProfile(true);
  const { activeModal, closeModal, modalData } = useModalStore();
  const isOpen = activeModal === ModalType.EDIT_BUSINESS_ABOUT;
  const description = ((modalData as Record<string, unknown>)?.description as string) || '';

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
        <DialogHeader className='px-6 pt-6 flex flex-row items-center gap-3 '>
        <div className="flex items-center p-3 lg:p-4 justify-center border border-gray-300 rounded-full">
            <Image src="/edit.svg" alt='edit' width={20} height={20}/>
          </div>
          <div>
          <DialogTitle className='text-nixerly-blue mb-1'>Edit About Section</DialogTitle>
          <DialogDescription className='w-4/5'>
            Update your business description. This helps potential clients
            understand your services.
          </DialogDescription>
          </div>
        </DialogHeader>
        <Separator/>
        <EditBusinessAboutForm
          onSubmit={onSubmit}
          defaultValues={{ description }}
          onCancel={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
}
