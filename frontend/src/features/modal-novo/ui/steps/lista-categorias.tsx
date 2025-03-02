import { getCategorias } from '@/shared/api/endpoints/categoria-cli';
import { Categoria } from '@/types/models/categoria';
import { useEffect, useState } from 'react';
import { DialogOrDrawerHeader } from '../step-header';
import { StepObject, useStepper } from '../stepper';

type ListaCategoriasProps = {
    stepBack: StepObject<string>;
};

export function ListaCategorias({ stepBack }: ListaCategoriasProps) {
    const { goToStep } = useStepper();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    useEffect(() => {
        getCategorias('D').then((data) => {
            setCategorias(data);
        });
    }, []);
    return (
        <>
            <DialogOrDrawerHeader
                title={'Categorias'}
                onBack={() => goToStep(stepBack)}
            />
            <div className=" grid h-[20rem] grid-cols-2 gap-4 overflow-y-scroll pr-4 hover:shadow-md">
                {categorias.map((categoria) => (
                    <div
                        key={categoria.sigla}
                        className="flex aspect-square flex-col items-center justify-center rounded-md border"
                    >
                        <div
                            className="flex h-7 w-7 items-center justify-center rounded-full"
                            style={{ backgroundColor: categoria.cor }}
                        >
                            <i
                                className={`ph flex ${categoria.icone} text-xl`}
                            />
                        </div>
                        {categoria.nome}
                    </div>
                ))}
            </div>
        </>
    );
}
