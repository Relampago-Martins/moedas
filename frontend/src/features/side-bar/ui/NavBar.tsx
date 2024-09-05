'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { HTMLAttributes, ReactNode } from 'react';
import {
    Menu,
    MenuItem,
    MenuItemProps,
    MenuProps,
    Sidebar,
    SidebarProps,
} from 'react-pro-sidebar';
import { useSidebarStore } from '../lib/sidebar-store';
import './ui.scss';

type RootProps = SidebarProps & {
    children: ReactNode;
    open?: boolean;
};
function NavBar({ children, ...props }: RootProps) {
    const [toggled, collapsed, setToggled, setCollapsed] = useSidebarStore(
        (state) => [
            state.isToggled,
            state.isCollapsed,
            state.setToggled,
            state.setCollapsed,
        ],
    );

    return (
        <Sidebar
            toggled={toggled}
            collapsed={collapsed}
            breakPoint="md"
            onBreakPoint={() => {
                setCollapsed(false);
                setToggled(false);
            }}
            onBackdropClick={() => setToggled(false)}
            {...props}
            className={`root ${props.className}`}
        >
            {children}
        </Sidebar>
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
    const [collapse, collapsed] = useSidebarStore((state) => [
        state.collapse,
        state.isCollapsed,
    ]);
    return (
        <div
            className={`trigger ${className}`}
            {...props}
            onClick={() => collapse()}
        >
            {!collapsed ? children : props.icon}
        </div>
    );
}

type OuterTriggerProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

function NavBarOuterTrigger({
    children,
    className,
    ...props
}: OuterTriggerProps) {
    const toggle = useSidebarStore((state) => state.toggle);
    return (
        <div
            className={`trigger ${className}`}
            {...props}
            onClick={() => toggle()}
        >
            {children}
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
function NavBarItem({
    children,
    className,
    activeName,
    onClick,
    ...props
}: ItemProps) {
    const toogle = useSidebarStore((state) => state.toggle);
    const path = usePathname();
    const isActive = path === activeName;
    return (
        <MenuItem
            active={isActive}
            className={`${className} text-sm font-medium opacity-85`}
            onClick={(e) => {
                setTimeout(() => toogle(), 350);
                onClick?.(e);
            }}
            {...props}
        >
            {isActive && (
                <motion.div
                    layoutId="borda-menu-item"
                    className="absolute inset-0 rounded-lg border border-primary"
                />
            )}
            {children}
        </MenuItem>
    );
}

export {
    NavBar,
    NavBarContent,
    NavBarFooter,
    NavBarHeader,
    NavBarItem,
    NavBarOuterTrigger,
    NavBarTrigger,
};
