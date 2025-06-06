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

export function EditCertificatesModal() {
  const { activeModal, closeModal } = useModalStore();
  const isOpen = activeModal === ModalType.EDIT_CERTIFICATES;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Manage Certificates</DialogTitle>
          <DialogDescription>
            Add or update your professional certificates. You can add multiple certificates
            and upload images for each one.
          </DialogDescription>
        </DialogHeader>
        <EditCertificatesForm onClose={closeModal} />
      </DialogContent>
    </Dialog>
  );
} 