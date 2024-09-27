'use client';

import { ItemMovimentacao } from '@/entities/item-movimentacao/ui';
import { useMovimentacaoContext } from '@/entities/modal-movimentacao/lib/use-movimentacao-context';
import { Movimentacao } from '@/types/models/movimentacao';

export function ListaMovimentacoes({
    movimentacoes,
}: {
    movimentacoes: Movimentacao[];
}) {
    const { setMovimentacaoSelecionada } = useMovimentacaoContext();

    return (
        <ul className="flex flex-col gap-2">
            {movimentacoes.length > 0 ? (
                movimentacoes.map((despesa) => (
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
                ))
            ) : (
                <p>Não há movimentações</p>
            )}
        </ul>
    );
}
