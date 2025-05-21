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
  openModal: (modal: ModalType, data: ModalDataType = {}) => set({ activeModal: modal, modalData: data }),
  closeModal: () => set({ activeModal: ModalType.NONE, modalData: null }),
})) 