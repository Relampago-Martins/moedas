'use client';
import { DialogDrawer } from '@/shared/ui/custom/dialog-drawer';
import { useMovimentacaoContext } from '../lib/use-movimentacao-context';
import { DespesaContent } from './movimentacoes/despesa';
import { ReceitaDetail } from './movimentacoes/receita';

export function ModalMovimentacao() {
    const { movimentacaoSelecionada, setMovimentacaoSelecionada } =
        useMovimentacaoContext();

    return (
        <DialogDrawer
            className="overflow-hidden sm:min-h-[14rem] md:max-w-[20rem]"
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
                <ReceitaDetail id={movimentacaoSelecionada.id} />
            )}
        </DialogDrawer>
    );
}
