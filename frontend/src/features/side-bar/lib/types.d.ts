export type SidebarStore = {
    isToggled: boolean; // hide/show sidebar completely
    isCollapsed: boolean; // hide/show sidebar labels
    toggle: () => void;
    collapse: () => void;
    setToggled: (value: boolean) => void;
    setCollapsed: (value: boolean) => void;
};
