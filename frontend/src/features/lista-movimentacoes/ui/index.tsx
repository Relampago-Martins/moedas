'use client';

import { ItemMovimentacao } from '@/entities/item-movimentacao/ui';
import { useMovimentacaoContext } from '@/entities/modal-movimentacao/lib/use-movimentacao-context';
import { Movimentacao } from '@/types/models/movimentacao';
import { cleanDate, separarPorDatas } from '../lib';

export function ListaMovimentacoes({
    movimentacoes,
}: {
    movimentacoes: Movimentacao[];
}) {
    const { setMovimentacaoSelecionada } = useMovimentacaoContext();
    const movimentacoesPorDatas = separarPorDatas(movimentacoes.toReversed());

    return (
        <ul className="flex flex-col gap-2">
            {movimentacoes.length > 0 ? (
                movimentacoesPorDatas.map((movimentacoesPorData) => (
                    <div
                        className="flex flex-col gap-2"
                        key={movimentacoesPorData.data}
                    >
                        <span className="text-muted">
                            {cleanDate(movimentacoesPorData.data)}
                        </span>
                        {movimentacoesPorData.movimentacoes.map((despesa) => (
                            <ItemMovimentacao
                                key={despesa.id}
                                gasto={despesa}
                                prefixLayoutId={'lista-mov'}
                                onClick={() =>
                                    setMovimentacaoSelecionada({
                                        id: despesa.id,
                                        tipo: despesa.tipo,
                                    })
                                }
                            />
                        ))}
                    </div>
                ))
            ) : (
                <p>Não há movimentações</p>
            )}
        </ul>
    );
}
