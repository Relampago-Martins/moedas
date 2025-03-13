'use client';
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
    return (
        <div className="flex h-[250px] w-full flex-col gap-4">
            {categorias.map((categoria) => (
                <CardCategoria
                    onClick={() => {
                        setCategoriaSelecionada(categoria);
                    }}
                    key={categoria.sigla}
                    categoria={categoria}
                    selecionado={
                        categoriaSelecionada?.sigla === categoria.sigla
                    }
                    porcentualDoTotal={
                        (categoria.total_movimentacoes / gastosTotais) * 100
                    }
                />
            ))}
        </div>
    );
}
