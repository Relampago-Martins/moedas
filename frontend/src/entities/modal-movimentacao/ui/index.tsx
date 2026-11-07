'use client';
import { DialogOrDrawer } from '@/shared/ui/custom/dialog-drawer';
import { useState } from 'react';
import { useMovimentacaoContext } from '../lib/use-movimentacao-context';
import { DespesaContent } from './movimentacoes/despesa-content';
import { ReceitaContent } from './movimentacoes/receita-content';

export function ModalMovimentacao() {
    const { movimentacaoSelecionada, setMovimentacaoSelecionada } =
        useMovimentacaoContext();

    // A seleção vira `undefined` no clique de fechar, mas o modal ainda precisa
    // do conteúdo e da origem enquanto encolhe de volta para o item.
    const [ultimaSelecionada, setUltimaSelecionada] = useState(
        movimentacaoSelecionada,
    );
    if (
        movimentacaoSelecionada &&
        movimentacaoSelecionada !== ultimaSelecionada
    ) {
        setUltimaSelecionada(movimentacaoSelecionada);
    }

    return (
        <DialogOrDrawer
            className="overflow-hidden md:w-auto md:min-w-[20rem]"
            open={!!movimentacaoSelecionada?.id}
            originId={ultimaSelecionada?.origemId}
            deferContent
            onOpenChange={(val) => {
                if (!val) {
                    setMovimentacaoSelecionada(undefined);
                }
            }}
        >
            {ultimaSelecionada?.tipo === 'D' && (
                <DespesaContent id={ultimaSelecionada.id} />
            )}
            {ultimaSelecionada?.tipo === 'R' && (
                <ReceitaContent id={ultimaSelecionada.id} />
            )}
        </DialogOrDrawer>
    );
}
