'use client';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
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
            <DialogContent className="bg-popover md:max-w-[20rem]">
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
