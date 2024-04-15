import { createContext } from "react";

type NavBarContext = {
    open: boolean;
    setOpen?: (open: boolean) => void;
}

export const NavBarContext = createContext<NavBarContext>({
    open: false,
    setOpen: () => {}
});

type OuterNavBarContext = {
    toggled: boolean;
    setToggled: (toggle: boolean) => void;
}

export const OuterNavBarContext = createContext<OuterNavBarContext>({
    toggled: false,
    setToggled: () => {}
});