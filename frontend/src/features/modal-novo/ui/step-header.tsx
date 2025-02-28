import { Button } from '@/shared/ui/button';
import { DialogClose, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { DrawerClose, DrawerHeader, DrawerTitle } from '@/shared/ui/drawer';
import { ChevronLeft, X } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

type DialogOrDrawerHeaderProps = {
    title: string;
    onBack?: () => void;
    withBackButton?: boolean;
};

export function DialogOrDrawerHeader({
    title,
    withBackButton = true,
    onBack,
}: DialogOrDrawerHeaderProps) {
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

    return isMobile ? (
        <DrawerHeader className="px-0 pt-1">
            <DrawerTitle className="mb-2 flex justify-between text-xl text-primary">
                <div className="w-6">
                    {withBackButton && (
                        <Button
                            variant={'ghost'}
                            className="p-0 pr-4"
                            onClick={onBack}
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                    )}
                </div>
                {title}
                <DrawerClose className="w-6">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </DrawerClose>
            </DrawerTitle>
        </DrawerHeader>
    ) : (
        <DialogHeader>
            <DialogTitle className="mb-2 flex items-center justify-between pb-4 text-xl text-primary">
                {withBackButton && (
                    <Button
                        variant={'ghost'}
                        className="h-full p-0 pr-2"
                        onClick={onBack}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                )}
                {title}
                <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogTitle>
        </DialogHeader>
    );
}
