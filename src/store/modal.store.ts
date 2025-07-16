import { create } from "zustand"
import { ModalType } from "@/types/model"
import { TBusinessAsset } from "@/types/auth"
import { Portfolio } from "@/types/worker.types"

interface ContactModalData {
  applicant: {
    workerProfile: {
      user: {
        firstName: string;
        lastName: string;
        email: string;
      };
      profilePicture?: string;
      phoneNumber: string;
    };
    relevantExperience: string;
  };
}

export interface ShareModalData {
  profileUrl: string;
  profileName: string;
}

interface CompanyImagesModalData {
  assets: TBusinessAsset[];
}

export interface PortfolioModalData {
  portfolio: Portfolio[];
}

interface BusinessPhoneModalData {
  phoneNumber?: string;
}

type ModalDataType = ContactModalData | ShareModalData | CompanyImagesModalData | PortfolioModalData | BusinessPhoneModalData | Record<string, unknown>

interface ModalStore {
  activeModal: ModalType
  modalData: ModalDataType | null
  openModal: (modal: ModalType, data?: ModalDataType) => void
  closeModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: ModalType.NONE,
  modalData: null,
  openModal: (modal: ModalType, data: ModalDataType = {}) => {
    // Close any open dropdowns by clicking outside
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    document.body.dispatchEvent(clickEvent);
    
    set({ activeModal: modal, modalData: data });
  },
  closeModal: () => {
    // Close any open dropdowns by clicking outside
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    document.body.dispatchEvent(clickEvent);
    
    set({ activeModal: ModalType.NONE, modalData: null });
  },
})) 