"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { EditBusinessProfileForm } from "../forms/edit-business-profile";
import { useUpdateBusinessProfile } from "@/hook/user/user.hooks";
import { Separator } from "../ui/separator";

export interface EditBusinessProfileModalData {
  industry: string;
  location: string;
  city?: string;
  state?: string;
  country?: string;
  website?: string | null;
  employeeCount: number | string;
  yearFounded: number;
  phoneNumber?: string | null;
}

const getEmployeeCountNumber = (range: string | number): number => {
  const [min] = range.toString().split("-");
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
        data.employeeCount === "100+"
          ? 100
          : getEmployeeCountNumber(data.employeeCount),
      yearFounded: data.yearFounded,
      phoneNumber: data.phoneNumber || null,
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
        <DialogHeader className="flex flex-row items-center gap-3 px-6 pt-6">
          <div className="flex items-center justify-center h-10 w-10 md:w-14 md:h-14 border border-gray-300 rounded-full">
            <span className="text-lg sm:text-base font-medium">01</span>
          </div>
          <div>
            <DialogTitle className="text-nixerly-blue mb-1 text-start">
              Edit Business Profile
            </DialogTitle>
            <DialogDescription className="w-4/5">
              Update your business profile information. Click save when
              you&apos;re done.
            </DialogDescription>
          </div>
        </DialogHeader>
        <Separator />
        <EditBusinessProfileForm
          onCancel={closeModal}
          onSubmit={onSubmit}
          defaultValues={profileData}
        />
      </DialogContent>
    </Dialog>
  );
}
