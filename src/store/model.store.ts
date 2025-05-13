import { create } from "zustand"
import { ModalType } from "@/types/model"

interface ModalStore {
  activeModal: ModalType
  modalData: any | null
  openModal: (modal: ModalType, data?: any) => void
  closeModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: ModalType.NONE,
  modalData: null,
  openModal: (modal: ModalType, data: any = null) => set({ activeModal: modal, modalData: data }),
  closeModal: () => set({ activeModal: ModalType.NONE, modalData: null }),
})) 