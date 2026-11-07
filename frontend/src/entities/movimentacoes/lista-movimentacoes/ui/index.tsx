'use client';
import { useMovimentacaoContext } from '@/entities/modal-movimentacao/lib/use-movimentacao-context';
import { useModalNovoStore } from '@/features/modal-novo/lib/modal-novo-store';
import { ModalNovoOrigin } from '@/features/modal-novo/ui/modal-novo-origin';
import { getMovimentacoes } from '@/shared/api/endpoints/movimentacao-cli';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import {
    getItemMovimentacaoOrigemId,
    ItemMovimentacao,
} from '../../item-movimentacao/ui';
import { ItemMovimentacaoSkeleton } from '../../item-movimentacao/ui/item-movimentacao-skeleton';
import { cleanDate, separarPorDatas } from '../lib';

export function ListaMovimentacoes() {
    const searchParams = useSearchParams();
    const abrirModalNovo = useModalNovoStore((state) => state.abrir);
    const {
        movimentacaoSelecionada,
        setMovimentacaoSelecionada,
        setMovimentacoes,
    } = useMovimentacaoContext();

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
                    className="flex max-w-full flex-col gap-2"
                    key={movimentacoesPorData.data}
                >
                    <span className="text-muted-foreground">
                        {cleanDate(movimentacoesPorData.data)}
                    </span>
                    {movimentacoesPorData.movimentacoes.map((despesa) => {
                        const origemId = getItemMovimentacaoOrigemId(
                            'lista-mov',
                            despesa.id,
                        );
                        return (
                            <ItemMovimentacao
                                key={despesa.id}
                                gasto={despesa}
                                prefixLayoutId={'lista-mov'}
                                expanded={
                                    movimentacaoSelecionada?.origemId ===
                                    origemId
                                }
                                onClick={() =>
                                    setMovimentacaoSelecionada({
                                        id: despesa.id,
                                        tipo: despesa.tipo,
                                        origemId,
                                    })
                                }
                            />
                        );
                    })}
                </div>
            ))}
            {movimentacoes?.length === 0 && (
                <p className="flex h-100 max-w-full flex-col items-center justify-center gap-0 rounded-md border border-dashed text-muted-foreground">
                    <i className="ph-thin ph-receipt-x text-7xl"></i>
                    <span className="text-base font-medium">
                        Nenhuma movimentação
                    </span>
                    <Button
                        type="button"
                        variant={'link'}
                        className="relative"
                        onClick={() => abrirModalNovo('lista-movimentacoes')}
                    >
                        Criar
                        <ModalNovoOrigin id="lista-movimentacoes" />
                    </Button>
                </p>
            )}
            {isLoading &&
                [1, 2].map((_, index) => (
                    <div
                        className="flex h-full max-w-full flex-col gap-2"
                        key={index}
                    >
                        <Skeleton className="h-4 w-20" />
                        {Array.from({ length: index + 1 }).map((_, index) => (
                            <ItemMovimentacaoSkeleton key={index} />
                        ))}
                    </div>
                ))}
            {isError && (
                <p className="flex h-full flex-col gap-2 text-muted-foreground">
                    <i className="ph ph-x-circle"></i>
                    Erro ao carregar movimentações
                </p>
            )}
        </ul>
    );
}
