'use client';
import { useMovimentacaoContext } from '@/entities/modal-movimentacao/lib/use-movimentacao-context';
import { ItemMovimentacao } from '@/entities/movimentacoes/item-movimentacao/ui';
import { getMovimentacoes } from '@/shared/api/endpoints/movimentacao-cli';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { cleanDate, separarPorDatas } from '../lib';

export function ListaMovimentacoes() {
    const searchParams = useSearchParams();
    const { setMovimentacaoSelecionada, setMovimentacoes } =
        useMovimentacaoContext();

    const {
        data: movimentacoes,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['movimentacoes', searchParams.toString()],
        queryFn: async () => {
            return getMovimentacoes({
                periodo: {
                    periodo_after: searchParams.get('periodo_after') || '',
                    periodo_before: searchParams.get('periodo_before') || '',
                },
            }).then((data) => {
                setMovimentacoes(data);
                return data;
            });
        },
    });

    const movimentacoesPorDatas = separarPorDatas(movimentacoes || []);

    return (
        <ul className="flex flex-col gap-2">
            {movimentacoesPorDatas.map((movimentacoesPorData) => (
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
            ))}
            {movimentacoes?.length === 0 && (
                <p className="h-full text-muted">
                    <i className="ph ph-receipt-x"></i>
                    Nenhuma movimentação encontrada
                </p>
            )}
            {isLoading && (
                <p className="h-full text-muted">
                    <i className="ph ph-spinner-third"></i>
                    Carregando movimentações...
                </p>
            )}
            {isError && (
                <p className="h-full text-muted">
                    <i className="ph ph-x-circle"></i>
                    Erro ao carregar movimentações
                </p>
            )}
        </ul>
    );
}
