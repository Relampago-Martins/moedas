import { create } from 'zustand';
import { ModalNovoStore } from './types';

export const useModalNovoStore = create<ModalNovoStore>((set) => ({ 
    isOpen: false,
    onOpenChange: (isOpen) => {
        set({ isOpen })
        // if (!isOpen)
        //     setTimeout(() => {
        //         set({ step: 'menu' });
        //     }, 300);
    },
}));