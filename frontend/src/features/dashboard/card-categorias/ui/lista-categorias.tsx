'use client';
import { numberToCurrency } from '@/shared/lib/utils';
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

    const valorTotalSelecionado = numberToCurrency(
        categoriaSelecionada?.total_movimentacoes ?? gastosTotais,
    )
        .replace('R$', '')
        .trim();

    return (
        <div className="grid w-full grid-cols-4 gap-2">
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
                    hide={
                        categoriaSelecionada &&
                        categoria.sigla !== categoriaSelecionada.sigla
                    }
                />
            ))}

            <div
                style={{
                    color:
                        categoriaSelecionada?.cor.texto ?? 'var(--foreground)',
                }}
                className="col-span-2 col-start-2 row-start-1 flex h-full w-full flex-col rounded-md"
            >
                <span className="w-full text-center text-sm ">
                    {categoriaSelecionada?.nome ?? 'Total'}
                </span>
                <div className="-mt-1 flex h-full items-center justify-center ">
                    <span className="mr-1 mt-1 text-sm">R$</span>
                    <div className="shrink-0 text-xl font-semibold">
                        {valorTotalSelecionado}
                    </div>
                </div>
            </div>
            {categorias.length % 2 !== 0 && (
                <div className=" h-12 rounded-md border border-dashed"></div>
            )}
        </div>
    );
}
