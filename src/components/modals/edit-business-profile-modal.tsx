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
import Image from "next/image";

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
          <div className="flex items-center justify-center p-3 lg:p-4 border border-gray-300 rounded-full">
            <Image src="/edit.svg" alt='edit' width={20} height={20}/>
          </div>
          <div>
            <DialogTitle className="text-nixerly-blue mb-1 text-start">
              Edit Business Profile
            </DialogTitle>
            <DialogDescription className=" max-w-11/12 text-start">
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
