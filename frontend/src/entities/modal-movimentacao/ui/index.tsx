'use client';
import { DialogDrawer } from '@/shared/ui/custom/dialog-drawer';
import { AnimatePresence } from 'framer-motion';
import { useMovimentacaoContext } from '../lib/use-movimentacao-context';
import { DespesaDetail } from './movimentacoes/despesa';
import { ReceitaDetail } from './movimentacoes/receita';

export function ModalMovimentacao() {
    const { movimentacaoSelecionada, setMovimentacaoSelecionada } =
        useMovimentacaoContext();

    return (
        <DialogDrawer
            className="md:max-w-[20rem]"
            open={!!movimentacaoSelecionada?.id}
            onOpenChange={(val) => {
                if (!val) {
                    setMovimentacaoSelecionada(undefined);
                }
            }}
        >
            <AnimatePresence mode="wait">
                {movimentacaoSelecionada?.tipo === 'D' && (
                    <DespesaDetail id={movimentacaoSelecionada.id} />
                )}
                {movimentacaoSelecionada?.tipo === 'R' && (
                    <ReceitaDetail id={movimentacaoSelecionada.id} />
                )}
            </AnimatePresence>
        </DialogDrawer>
    );
}
