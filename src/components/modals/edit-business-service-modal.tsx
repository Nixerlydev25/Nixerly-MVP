'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EditServiceForm } from '../forms/edit-service-form';
import { useModalStore } from '@/store/modal.store';
import { ModalType } from '@/types/model';

export function EditServicesModal() {
  const { activeModal, closeModal, modalData } = useModalStore();
  const isOpen = activeModal === ModalType.EDIT_BUSINESS_SERVICES;
  const services = ((modalData as Record<string, unknown>)?.services as Array<{ id: number | string; title: string; description: string }>) || [];

  const onSubmit = (data: { services: Array<{ id: number | string; title: string; description: string }> }) => {
    console.log(data);
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Services</DialogTitle>
          <DialogDescription>
            Update the services your business offers. Add, edit, or remove
            services as needed.
          </DialogDescription>
        </DialogHeader>
        <EditServiceForm
          onSubmit={onSubmit}
          defaultValues={{ services }}
          onCancel={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
}
