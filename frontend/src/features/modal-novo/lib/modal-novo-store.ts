import { create } from 'zustand';

type ModalNovoStore = {
    isOpen: boolean;
    onOpenChange: (newState: boolean) => void;
};

export const useModalNovoStore = create<ModalNovoStore>((set) => ({ 
    isOpen: false,
    onOpenChange: (newState) => set({ isOpen: newState }),
}));