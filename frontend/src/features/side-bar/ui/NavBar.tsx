'use client';
import { usePathname } from 'next/navigation';
import {
    HTMLAttributes,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import {
    Menu,
    MenuItem,
    MenuItemProps,
    MenuProps,
    Sidebar,
    SidebarProps,
} from 'react-pro-sidebar';
import { NavBarContext, OuterNavBarContext } from '../lib/context';
import './ui.scss';

type RootProps = SidebarProps & {
    children: ReactNode;
    open?: boolean;
};
function NavBar({ children, ...props }: RootProps) {
    const { toggled, setToggled } = useContext(OuterNavBarContext);
    const [open, setOpen] = useState<boolean>(props.open || false);
    useEffect(() => {
        setOpen(true);
    }, [toggled]);

    return (
        <NavBarContext.Provider value={{ open, setOpen }}>
            <Sidebar
                collapsed={!open}
                breakPoint="md"
                toggled={toggled}
                onBackdropClick={() => setToggled(false)}
                {...props}
                className={`root ${props.className}`}
            >
                {children}
            </Sidebar>
        </NavBarContext.Provider>
    );
}

function NavBarHeader({ children, ...props }: { children: ReactNode }) {
    return <div className={`header`}>{children}</div>;
}

type NavBarTriggerProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    icon?: ReactNode;
};
function NavBarTrigger({ children, className, ...props }: NavBarTriggerProps) {
    const { open, setOpen } = useContext(NavBarContext);
    return (
        <div
            className={`trigger ${className}`}
            {...props}
            onClick={() => setOpen?.(!open)}
        >
            {open ? children : props.icon}
        </div>
    );
}

function NavBarFooter({ children, ...props }: { children: ReactNode }) {
    return <div className={`footer`}>{children}</div>;
}

type ContentProps = MenuProps & {
    children: ReactNode;
};

function NavBarContent({ children, ...props }: ContentProps) {
    return (
        <Menu className="content" {...props}>
            {children}
        </Menu>
    );
}

type ItemProps = Omit<MenuItemProps, 'active'> & {
    children: ReactNode;
    /* Name of the route that should be considered active*/
    activeName?: string;
};
function NavBarItem({ children, className, activeName, ...props }: ItemProps) {
    const path = usePathname();
    return (
        <MenuItem
            active={path === activeName}
            {...props}
            className={`${className} text-sm font-medium opacity-85`}
        >
            {children}
        </MenuItem>
    );
}

function OuterProvider({ children }: { children: ReactNode }) {
    const [toggled, setToggled] = useState<boolean>(false);

    return (
        <OuterNavBarContext.Provider value={{ toggled, setToggled }}>
            {children}
        </OuterNavBarContext.Provider>
    );
}

type OuterTriggerProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

function OuterTrigger({ children, className, ...props }: OuterTriggerProps) {
    const { toggled, setToggled } = useContext(OuterNavBarContext);
    return (
        <div
            className={`trigger ${className}`}
            {...props}
            onClick={() => {
                setToggled?.(!toggled);
            }}
        >
            {children}
        </div>
    );
}

export {
    NavBar,
    NavBarContent,
    NavBarFooter,
    NavBarHeader,
    NavBarItem,
    NavBarTrigger,
    OuterProvider,
    OuterTrigger,
};
