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
import Image from 'next/image';

export function EditCertificatesModal() {
  const { activeModal, modalData, closeModal } = useModalStore();
  const isOpen = activeModal === ModalType.EDIT_CERTIFICATES;
  const certificates = (modalData as { certificates: Certificate[] })?.certificates || [];

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className='flex flex-row items-center'>
        <div className="flex items-center justify-center p-3 lg:p-4 border border-gray-300 rounded-full">
            <Image src="/edit.svg" alt='edit' width={20} height={20}/>
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