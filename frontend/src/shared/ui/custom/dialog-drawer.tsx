'use client';
import { cn } from '@/shared/lib/utils';
import { useId } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Drawer, DrawerContent } from '../drawer';
import { ExpandableDialog, ExpandableDialogContent } from './expandable-dialog';

type DialogDrawerProps = {
    open: boolean;
    onOpenChange: (val: boolean) => void;
    children: React.ReactNode;
    className?: string;
    /**
     * `id` do `ExpandableDialog` de onde o modal sai no desktop. O elemento de
     * origem usa `expandableDialogLayoutId(originId)` como `layoutId`. Sem ele,
     * o modal entra sozinho, em escala e opacidade.
     */
    originId?: string;
};

/** Entrada de quando o modal não tem um item de origem na tela. */
const STANDALONE_ANIMATION = {
    initial: { opacity: 0, scale: 0.95, y: 8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 8 },
};

export function DialogOrDrawer({
    open: isOpen,
    onOpenChange,
    children: Content,
    className,
    originId,
}: DialogDrawerProps) {
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const fallbackId = useId();

    return isMobile ? (
        <Drawer
            open={isOpen}
            onOpenChange={onOpenChange}
            repositionInputs={false}
        >
            <DrawerContent className="bg-popover">{Content}</DrawerContent>
        </Drawer>
    ) : (
        <ExpandableDialog
            id={originId ?? fallbackId}
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <ExpandableDialogContent
                className={cn(className)}
                showCloseButton={false}
                {...(originId ? {} : STANDALONE_ANIMATION)}
            >
                {Content}
            </ExpandableDialogContent>
        </ExpandableDialog>
    );
}
