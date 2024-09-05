'use client';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';
import { useModalNovoStore } from '../lib/modal-novo-store';
import { CadastroGasto } from './CadastroGasto';
import { ListaTransferencias } from './ListaTransferencias';

export function ModalNovo() {
    const { isOpen, onOpenChange } = useModalNovoStore((state) => state);
    const router = useRouter();
    const urlParams = useSearchParams();
    const step = urlParams.get('step');

    if (!isOpen) return;
    return (
        <Dialog open={true} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col items-center justify-center gap-5">
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
