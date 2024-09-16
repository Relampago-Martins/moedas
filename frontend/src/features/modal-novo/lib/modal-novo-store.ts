import { create } from 'zustand';
import { ModalNovoStore } from './types';

export const useModalNovoStore = create<ModalNovoStore>((set) => ({ 
    isOpen: false,
    onOpenChange: (newState) => {
        set({ isOpen: newState })
        if (!newState)
            setTimeout(() => {
                set({ step: 'menu' });
            }, 300);
    },
    step: 'menu',
    setStep: (newStep) => set({ step: newStep }),
}));