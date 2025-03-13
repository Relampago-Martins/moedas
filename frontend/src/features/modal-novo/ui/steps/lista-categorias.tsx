'use client';
import { useStepper } from '@/entities/stepper/ui/stepper';
import { getCategorias } from '@/shared/api/endpoints/categoria-cli';
import { ReadableTextColorDiv } from '@/shared/ui/custom/readable-text-color-div';
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
            <div className="grid max-h-[25rem] grid-cols-2 gap-4 overflow-y-scroll pr-4">
                {categorias.map((categoria) => (
                    <button
                        key={categoria.sigla}
                        className="relative h-14 rounded-md border hover:shadow-md"
                        style={{ color: categoria.cor }}
                        onClick={() => {
                            events.submit('onSelectCategoria', categoria);
                            previous();
                        }}
                    >
                        <ReadableTextColorDiv
                            color={categoria.cor}
                            className="z-[1] flex items-center gap-2 px-4"
                        >
                            <div className="flex h-7 w-7 items-center justify-center rounded-full">
                                <i
                                    className={`ph flex ${categoria.icone} text-2xl`}
                                />
                            </div>
                            <span className="text-base font-normal">
                                {categoria.nome}
                            </span>
                        </ReadableTextColorDiv>
                        <div
                            className="absolute inset-0 z-0 rounded-md opacity-15"
                            style={{ backgroundColor: categoria.cor }}
                        ></div>
                    </button>
                ))}
                {categorias.length === 0 &&
                    Array.from({ length: 9 }).map((_, i) => (
                        <div
                            className="flex h-14 items-center gap-2 rounded-md border px-4"
                            key={i}
                        >
                            <Skeleton className="aspect-square h-7" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    ))}
            </div>
        </>
    );
}
