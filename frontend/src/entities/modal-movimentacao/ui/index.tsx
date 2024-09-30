'use client';
import { DialogDrawer } from '@/shared/ui/custom/dialog-drawer';
import { useMovimentacaoContext } from '../lib/use-movimentacao-context';
import { DespesaContent } from './movimentacoes/despesa-content';
import { ReceitaContent } from './movimentacoes/receita-content';

export function ModalMovimentacao() {
    const { movimentacaoSelecionada, setMovimentacaoSelecionada } =
        useMovimentacaoContext();

    return (
        <DialogDrawer
            className="overflow-hidden md:max-w-[22rem]"
            open={!!movimentacaoSelecionada?.id}
            onOpenChange={(val) => {
                if (!val) {
                    setMovimentacaoSelecionada(undefined);
                }
            }}
        >
            {movimentacaoSelecionada?.tipo === 'D' && (
                <DespesaContent id={movimentacaoSelecionada.id} />
            )}
            {movimentacaoSelecionada?.tipo === 'R' && (
                <ReceitaContent id={movimentacaoSelecionada.id} />
            )}
        </DialogDrawer>
    );
}
