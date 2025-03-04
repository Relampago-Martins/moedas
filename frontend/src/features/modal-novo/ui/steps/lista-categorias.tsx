import { getCategorias } from '@/shared/api/endpoints/categoria-cli';
import { useEvent } from '@/shared/ui/custom/use-event';
import { Categoria } from '@/types/models/categoria';
import { useEffect, useState } from 'react';
import { DialogOrDrawerHeader } from '../step-header';
import { StepObject, useStepper } from '../stepper';

type ListaCategoriasProps = {
    stepBack: StepObject<string>;
    onSelect?: (categoria: Categoria) => void;
};

export function ListaCategorias({ stepBack, onSelect }: ListaCategoriasProps) {
    const { submit, subscribe } = useEvent();
    const { goToStep } = useStepper();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    useEffect(() => {
        getCategorias('D').then((data) => {
            setCategorias(data);
        });
    }, []);

    useEffect(() => {
        const unsubscribe = subscribe('onSelectCategoria', (categoria) => {
            console.log(categoria);
        });
        return unsubscribe;
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
                            submit('onSelectCategoria', categoria);
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
