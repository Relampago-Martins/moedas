'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { ReadableTextColorDiv } from '@/shared/ui/custom/readable-text-color-div';
import { CategoriaTotalMov } from '@/types/models/categoria';
import { useContext } from 'react';
import { GastosContext } from '../lib/context';
import { CardCategoria } from './card-categoria';

type ListaCategoriasProps = {
    categorias: CategoriaTotalMov[];
};
export function ListaCategorias({ categorias }: ListaCategoriasProps) {
    const { categoriaSelecionada, setCategoriaSelecionada } =
        useContext(GastosContext);
    const gastosTotais = categorias.reduce(
        (acc, categoria) => acc + categoria.total_movimentacoes,
        0,
    );
    const percentualDoTotal = categoriaSelecionada
        ? (categoriaSelecionada?.total_movimentacoes / gastosTotais) * 100
        : 100;
    return (
        <div className="grid w-full grid-cols-4 gap-2">
            <ReadableTextColorDiv
                outerClassName="h-full col-span-2 row-span-2 px-2 "
                className="flex w-full flex-col text-center"
                color={categoriaSelecionada?.cor ?? 'var(--muted)'}
            >
                <span className="font-semibold">
                    {percentualDoTotal.toFixed(0)}%
                </span>
                <span className="text-lg">
                    {numberToCurrency(
                        categoriaSelecionada?.total_movimentacoes ??
                            gastosTotais,
                    )}
                </span>
            </ReadableTextColorDiv>
            {categorias.map((categoria) => (
                <CardCategoria
                    onClick={() => {
                        if (categoriaSelecionada?.sigla === categoria.sigla) {
                            setCategoriaSelecionada();
                        } else {
                            setCategoriaSelecionada(categoria);
                        }
                    }}
                    key={categoria.sigla}
                    categoria={categoria}
                    selecionado={
                        categoriaSelecionada?.sigla === categoria.sigla
                    }
                />
            ))}
            {categorias.length % 2 !== 0 && (
                <>
                    <div className="h-10 rounded-md border border-dashed"></div>
                    <div className="h-10 rounded-md border border-dashed"></div>
                    <div className="h-10 rounded-md border border-dashed"></div>
                </>
            )}
        </div>
    );
}
