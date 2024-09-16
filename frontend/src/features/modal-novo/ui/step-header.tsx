import { Button } from '@/shared/ui/button';
import { DialogClose, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { ChevronLeft, X } from 'lucide-react';
import { useModalNovoStore } from '../lib/modal-novo-store';

type StepHeaderProps = {
    title: string;
    backBtn?: boolean;
};

export function StepHeader({ title, backBtn }: StepHeaderProps) {
    const setStep = useModalNovoStore((state) => state.setStep);

    return (
        <DialogHeader>
            <DialogTitle className="mb-2 flex items-center justify-between pb-4 text-primary">
                {backBtn && (
                    <Button
                        variant={'ghost'}
                        className="h-full p-0 pr-2"
                        onClick={() => setStep('menu')}
                    >
                        <ChevronLeft className="h-4 w-4" />
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
