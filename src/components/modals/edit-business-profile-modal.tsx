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
import { EditBusinessProfileForm } from '../forms/edit-business-profile';
import { useUpdateBusinessProfile } from '@/hook/user/user.hooks';

export interface EditBusinessProfileModalData {
  industry: string;
  location: string;
  city?: string;
  state?: string;
  country?: string;
  website?: string | null;
  employeeCount: number | string;
  yearFounded: number;
}

const getEmployeeCountNumber = (range: string | number): number => {
  const [min] = range.toString().split('-');
  return parseInt(min, 10);
};

export function EditBusinessProfileModal() {
  const { mutateAsync } = useUpdateBusinessProfile(true);
  const { activeModal, closeModal, modalData } = useModalStore();
  const isOpen = activeModal === ModalType.EDIT_BUSINESS_PROFILE;
  const profileData = modalData as unknown as EditBusinessProfileModalData;

  const onSubmit = (data: EditBusinessProfileModalData) => {
    const businessProfileData = {
      industry: data.industry,
      city: data.city,
      country: data.country,
      state: data.state,
      website: data.website || null,
      employeeCount:
        data.employeeCount === '100+'
          ? 100
          : getEmployeeCountNumber(data.employeeCount),
      yearFounded: data.yearFounded,
    };
    mutateAsync(businessProfileData, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Business Profile</DialogTitle>
          <DialogDescription>
            Update your business profile information. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <EditBusinessProfileForm
          onSubmit={onSubmit}
          defaultValues={profileData}
        />
      </DialogContent>
    </Dialog>
  );
}
