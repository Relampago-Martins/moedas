'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { useTheme } from 'next-themes';
import { useContext } from 'react';
import { GastosContext } from '../lib/context';

type CategoriaValueProps = {
    gastosTotais: number;
};
export function CategoriaValue({ gastosTotais }: CategoriaValueProps) {
    const { categoriaSelecionada } = useContext(GastosContext);
    const isDarkTheme = useTheme().theme === 'dark';
    const corTexo = isDarkTheme
        ? categoriaSelecionada?.cor.fundo
        : categoriaSelecionada?.cor.texto;
    const valorTotalSelecionado = numberToCurrency(
        categoriaSelecionada?.total_movimentacoes ?? gastosTotais,
    )
        .replace('R$', '')
        .trim();

    return (
        <div
            className="col-span-2 col-start-2 row-start-1 mb-2 flex w-full flex-col justify-center rounded-md"
            style={{
                color: corTexo ?? 'var(--foreground)',
            }}
        >
            <span className="w-full text-center text-base font-normal">
                {categoriaSelecionada?.nome ?? 'Total'}
            </span>
            <div className="-mt-1 flex items-center justify-center ">
                <span className="mr-1 mt-1 text-base font-normal">R$</span>
                <div className="shrink-0 text-2xl font-semibold">
                    {valorTotalSelecionado}
                </div>
            </div>
        </div>
    );
}
