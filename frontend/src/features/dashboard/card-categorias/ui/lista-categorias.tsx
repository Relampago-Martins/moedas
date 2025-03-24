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

            {categorias.length % 2 !== 0 && (
                <div className=" h-12 rounded-md border border-dashed"></div>
            )}
        </div>
    );
}
