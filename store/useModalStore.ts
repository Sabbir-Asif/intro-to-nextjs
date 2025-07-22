import { create } from 'zustand';

interface ModalStore {
    isAddModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    isAddModalOpen: false,
    openModal: () => set({ isAddModalOpen: true}),
    closeModal: () => set({isAddModalOpen: false})
}));