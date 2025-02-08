'use client';

import { useMovimentacaoContext } from '@/entities/modal-movimentacao/lib/use-movimentacao-context';
import { ItemMovimentacao } from '@/entities/movimentacoes/item-movimentacao/ui';
import { listaMovimentacoes } from '@/shared/api/endpoints/movimentacao-cli';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { cleanDate, separarPorDatas } from '../lib';

export function ListaMovimentacoes() {
    const searchParams = useSearchParams();
    const { setMovimentacaoSelecionada, setMovimentacoes, movimentacoes } =
        useMovimentacaoContext();

    useEffect(() => {
        listaMovimentacoes({
            periodo: {
                periodo_after: searchParams.get('periodo_after') || undefined,
                periodo_before: searchParams.get('periodo_before') || undefined,
            },
        }).then((movimentacoes) => {
            setMovimentacoes(movimentacoes);
        });
    }, [searchParams]);

    const movimentacoesPorDatas = separarPorDatas(movimentacoes);

    return (
        <ul className="flex flex-col gap-2">
            {movimentacoes.length > 0 ? (
                movimentacoesPorDatas.map((movimentacoesPorData) => (
                    <div
                        className="flex max-w-[40rem] flex-col gap-2"
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
