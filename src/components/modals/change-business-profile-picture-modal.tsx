'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/store/modal.store';
import { ModalType } from '@/types/model';
import { ChangeBusinessProfilePictureForm } from '../forms/change-business-profile-picture';

export function ChangeBusinessProfilePictureModal() {
  const { activeModal, closeModal } = useModalStore();

  const isModalOpen = activeModal === ModalType.CHANGE_BUSINESS_PROFILE_PICTURE;

  return (
    <Dialog open={isModalOpen} onOpenChange={() => closeModal()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Profile Picture</DialogTitle>
        </DialogHeader>
        <ChangeBusinessProfilePictureForm />
      </DialogContent>
    </Dialog>
  );
} 