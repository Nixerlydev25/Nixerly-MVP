import { create } from "zustand"
import { ModalType } from "@/types/model"

type ModalDataType = Record<string, unknown> | {
  [key: string]: unknown
}

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