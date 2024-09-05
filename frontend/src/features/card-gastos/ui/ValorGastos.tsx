'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { useContext } from 'react';
import { Categoria } from '../lib';
import { GastosContext } from '../lib/context';

type ValorGastosProps = {
    gastosPorCategoria: {
        categoria: Categoria;
        valor: number;
    }[];
};

export function ValorGastos({ gastosPorCategoria }: ValorGastosProps) {
    const { categoriaSelecionada } = useContext(GastosContext);
    const gastoCategoriaSelecionada =
        gastosPorCategoria.find(
            (gasto) => gasto.categoria.nome === categoriaSelecionada,
        ) ||
        gastosPorCategoria.reduce(
            (acc, gasto) => (gasto.valor > acc.valor ? gasto : acc),
            { valor: 0 },
        );

    return (
        <div className="text-end">
            {numberToCurrency(gastoCategoriaSelecionada.valor)}
        </div>
    );
}
