import { create } from 'zustand';
import { SidebarStore } from './types';

export const useSidebarStore = create<SidebarStore>((set) => ({
    isToggled: false,
    isCollapsed: true,
    toggle: () =>
        set((state: SidebarStore) => ({ isToggled: !state.isToggled })),
    collapse: () =>
        set((state: SidebarStore) => ({ isCollapsed: !state.isCollapsed })),
    setToggled: (value: boolean) => set({ isToggled: value }),
    setCollapsed: (value: boolean) => set({ isCollapsed: value }),
}));
