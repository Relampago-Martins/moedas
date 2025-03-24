'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { useContext } from 'react';
import { GastosContext } from '../lib/context';

type CategoriaValueProps = {
    gastosTotais: number;
};
export function CategoriaValue({ gastosTotais }: CategoriaValueProps) {
    const { categoriaSelecionada } = useContext(GastosContext);

    const valorTotalSelecionado = numberToCurrency(
        categoriaSelecionada?.total_movimentacoes ?? gastosTotais,
    )
        .replace('R$', '')
        .trim();

    return (
        <div
            style={{
                color: categoriaSelecionada?.cor.texto ?? 'var(--foreground)',
            }}
            className="col-span-2 col-start-2 row-start-1 mb-3 flex w-full flex-col rounded-md"
        >
            <span className="w-full text-center text-base ">
                {categoriaSelecionada?.nome ?? 'Total'}
            </span>
            <div className="-mt-1 flex h-full items-center justify-center ">
                <span className="mr-1 mt-1 text-base">R$</span>
                <div className="shrink-0 text-2xl font-semibold">
                    {valorTotalSelecionado}
                </div>
            </div>
        </div>
    );
}
