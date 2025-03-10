'use client';
import { useStepper } from '@/entities/stepper/ui/stepper';
import { getCategorias } from '@/shared/api/endpoints/categoria-cli';
import { Skeleton } from '@/shared/ui/skeleton';
import { Categoria } from '@/types/models/categoria';
import { useEffect, useState } from 'react';
import { DialogOrDrawerHeader } from '../step-header';

type ListaCategoriasProps = {
    tipoCategoria?: Categoria['tipo'];
};

export function ListaCategorias({ tipoCategoria = 'D' }: ListaCategoriasProps) {
    const { previous, events } = useStepper();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    useEffect(() => {
        getCategorias(tipoCategoria).then((data) => {
            setCategorias(data);
        });
    }, []);

    return (
        <>
            <DialogOrDrawerHeader
                title={'Selecionar Categoria'}
                onBack={() => previous()}
            />
            <div className=" grid h-[25rem] grid-cols-3 gap-4 overflow-y-scroll pr-4 ">
                {categorias.map((categoria) => (
                    <button
                        key={categoria.sigla}
                        className="relative flex aspect-square flex-col items-center justify-center gap-3 rounded-md border hover:shadow-md"
                        style={{ color: categoria.cor }}
                        onClick={() => {
                            events.submit('onSelectCategoria', categoria);
                            previous();
                        }}
                    >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full">
                            <i
                                className={`ph flex ${categoria.icone} text-4xl`}
                            />
                        </div>
                        <span className="text-sm font-medium">
                            {categoria.nome}
                        </span>
                        <div
                            className="absolute inset-0 rounded-md opacity-15"
                            style={{ backgroundColor: categoria.cor }}
                        ></div>
                    </button>
                ))}
                {categorias.length === 0 &&
                    Array.from({ length: 9 }).map((_, i) => (
                        <Skeleton key={i} className="aspect-square" />
                    ))}
            </div>
        </>
    );
}
