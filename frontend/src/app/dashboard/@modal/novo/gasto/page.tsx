'use client';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NovoGasto() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="flex flex-col items-center justify-center gap-5"
                onCloseAutoFocus={() => router.replace('/dashboard', undefined)}
            >
                <DialogHeader>
                    <DialogTitle className="text-primary">
                        Cadastro de Gasto
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
