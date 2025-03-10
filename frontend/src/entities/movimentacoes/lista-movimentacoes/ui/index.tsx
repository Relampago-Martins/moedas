'use client';
import { useMovimentacaoContext } from '@/entities/modal-movimentacao/lib/use-movimentacao-context';
import { useModalNovoStore } from '@/features/modal-novo/lib/modal-novo-store';
import { getMovimentacoes } from '@/shared/api/endpoints/movimentacao-cli';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { ItemMovimentacao } from '../../item-movimentacao/ui';
import { ItemMovimentacaoSkeleton } from '../../item-movimentacao/ui/item-movimentacao-skeleton';
import { cleanDate, separarPorDatas } from '../lib';

export function ListaMovimentacoes() {
    const searchParams = useSearchParams();
    const onOpenChange = useModalNovoStore((state) => state.onOpenChange);
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
                <p className="flex h-[25rem] max-w-[40rem] flex-col items-center justify-center gap-1 rounded-md border-[1px] border-dashed text-muted">
                    <i className="ph ph-receipt-x text-5xl"></i>
                    <span className="text-lg font-medium">
                        Nenhuma movimentação
                    </span>
                    <Button variant={'link'} onClick={() => onOpenChange(true)}>
                        Adicionar
                    </Button>
                </p>
            )}
            {isLoading &&
                [1, 2].map((_, index) => (
                    <div
                        className="flex h-full max-w-[40rem] flex-col gap-2"
                        key={index}
                    >
                        <Skeleton className="h-4 w-20" />
                        {Array.from({ length: index + 1 }).map((_, index) => (
                            <ItemMovimentacaoSkeleton key={index} />
                        ))}
                    </div>
                ))}
            {isError && (
                <p className="flex h-full flex-col gap-2 text-muted">
                    <i className="ph ph-x-circle"></i>
                    Erro ao carregar movimentações
                </p>
            )}
        </ul>
    );
}
