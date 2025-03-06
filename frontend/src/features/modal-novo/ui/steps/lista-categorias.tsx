import { getCategorias } from '@/shared/api/endpoints/categoria-cli';
import { Categoria } from '@/types/models/categoria';
import { useEffect, useState } from 'react';
import { DialogOrDrawerHeader } from '../step-header';
import { StepObject, useStepper } from '../stepper';

type ListaCategoriasProps = {
    stepBack: StepObject<string>;
    onSelect?: (categoria: Categoria) => void;
    tipoCategoria?: Categoria['tipo'];
};

export function ListaCategorias({
    stepBack,
    onSelect,
    tipoCategoria = 'D',
}: ListaCategoriasProps) {
    const { goToStep } = useStepper();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    useEffect(() => {
        getCategorias(tipoCategoria).then((data) => {
            setCategorias(data);
        });
    }, []);

    return (
        <>
            <DialogOrDrawerHeader
                title={'Categorias'}
                onBack={() => goToStep(stepBack)}
            />
            <div className=" grid h-[25rem] grid-cols-3 gap-4 overflow-y-scroll pr-4 ">
                {categorias.map((categoria) => (
                    <button
                        key={categoria.sigla}
                        className="relative flex aspect-square flex-col items-center justify-center gap-3 rounded-md border hover:shadow-md"
                        style={{ color: categoria.cor }}
                        onClick={() => {
                            onSelect?.(categoria);
                            goToStep(stepBack);
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
            </div>
        </>
    );
}
