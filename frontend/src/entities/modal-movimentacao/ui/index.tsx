'use client';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { X } from 'lucide-react';
import { useMovimentacaoContext } from '../lib/use-movimentacao-context';
import { DespesaDetail } from './movimentacoes/despesa';
import { ReceitaDetail } from './movimentacoes/receita';

export function ModalMovimentacao() {
    const { movimentacaoSelecionada, setMovimentacaoSelecionada } =
        useMovimentacaoContext();

    return (
        <Dialog
            open={!!movimentacaoSelecionada}
            onOpenChange={(val) => {
                if (!val) {
                    setMovimentacaoSelecionada(undefined);
                }
            }}
        >
            <DialogContent withoutClose>
                <DialogHeader>
                    <DialogTitle className="mb-2 flex items-center justify-between pb-4 text-xl text-primary">
                        Movimentação
                        <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                    </DialogTitle>
                </DialogHeader>
                {movimentacaoSelecionada?.tipo === 'D' && (
                    <DespesaDetail id={movimentacaoSelecionada.id} />
                )}
                {movimentacaoSelecionada?.tipo === 'R' && (
                    <ReceitaDetail id={movimentacaoSelecionada.id} />
                )}
            </DialogContent>
        </Dialog>
    );
}
