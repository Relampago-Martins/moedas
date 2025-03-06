import { create } from 'zustand';
import { ModalNovoStore } from './types';

export const useModalNovoStore = create<ModalNovoStore>((set) => ({ 
    isOpen: false,
    onOpenChange: (isOpen, afterModalClose) => {
        set({ isOpen })
        if (!isOpen)
            setTimeout(() => {
                afterModalClose?.();
            }, 300);
    },
}));