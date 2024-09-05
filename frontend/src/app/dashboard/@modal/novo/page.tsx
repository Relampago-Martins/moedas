'use client';
import { CadastroGasto } from '@/features/modal-novo/ui/CadastroGasto';
import { ListaTransferencias } from '@/features/modal-novo/ui/ListaTransferencias';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';

export default function Novo() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const urlParams = useSearchParams();
    const step = urlParams.get('step');
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
                    <DialogTitle className="flex justify-between gap-4 text-primary">
                        {step === 'gasto' ? (
                            <>
                                <BsArrowLeft onClick={() => router.back()} />
                                <span>Cadastro de Gastos</span>
                            </>
                        ) : step === 'receita' ? (
                            'Cadastro de Receitas'
                        ) : (
                            'Transferências'
                        )}
                    </DialogTitle>
                </DialogHeader>
                {step === 'gasto' ? (
                    <CadastroGasto />
                ) : step === 'receita' ? (
                    <h1>Receita</h1>
                ) : (
                    <ListaTransferencias />
                )}
            </DialogContent>
        </Dialog>
    );
}
