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
import { EditCertificatesForm } from '../forms/edit-certificates-form';
import { Certificate } from '@/types/worker.types';
import { Separator } from '../ui/separator';

export function EditCertificatesModal() {
  const { activeModal, modalData, closeModal } = useModalStore();
  const isOpen = activeModal === ModalType.EDIT_CERTIFICATES;
  const certificates = (modalData as { certificates: Certificate[] })?.certificates || [];

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className='flex flex-row items-center'>
        <div className="flex items-center justify-center h-10 w-10  md:w-14 md:h-14 border border-gray-300 rounded-full">
            <span className="text-lg sm:text-base font-medium">01</span>
          </div>
          <div className='space-y-2 ml-2'>
          <DialogTitle>Manage Certificates</DialogTitle>
          <DialogDescription>
            Add or update your professional certificates. You can add multiple certificates
            and upload images for each one.
          </DialogDescription>
          </div>
        </DialogHeader>
        <Separator/>
        <EditCertificatesForm onClose={closeModal} existingCertificates={certificates} />
      </DialogContent>
    </Dialog>
  );
} 