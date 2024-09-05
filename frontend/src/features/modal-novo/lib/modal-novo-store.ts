import { create } from 'zustand';
import { ModalNovoStore } from './types';

export const useModalNovoStore = create<ModalNovoStore>((set) => ({ 
    isOpen: false,
    onOpenChange: (newState) => set({ isOpen: newState }),
}));