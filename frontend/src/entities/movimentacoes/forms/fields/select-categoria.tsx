'use client';
import { useStepper } from '@/entities/stepper/ui/stepper';
import { getCategoria } from '@/shared/api/endpoints/categoria-cli';
import { Categoria } from '@/types/models/categoria';
import { DespesaSchema } from '@/types/models/despesa';
import React, { useEffect } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

type SelectCategoriaProps = ControllerRenderProps<
    DespesaSchema,
    'categoria'
> & {
    tipo?: Categoria['tipo'];
};

const SelectCategoria = React.forwardRef<
    HTMLSelectElement,
    Omit<SelectCategoriaProps, 'ref'>
>(({ onChange, value, tipo = 'D', ...props }, ref) => {
    const { goToStep } = useStepper();
    const [categoriaSelecionada, setCategoriaSelecionada] = React.useState<
        Categoria | undefined
    >();

    useEffect(() => {
        if (value) {
            getCategoria(value).then(setCategoriaSelecionada);
        }
    }, []);

    return (
        <button
            type="button"
            value={value}
            className="relative flex h-9 items-center rounded-md border"
            onClick={() =>
                goToStep({
                    name:
                        tipo === 'D'
                            ? 'lista-categorias'
                            : 'lista-categorias-receita',
                    level: 2,
                })
            }
        >
            {categoriaSelecionada ? (
                <div className="relative ml-3 w-full">
                    <span
                        className="flex items-center  gap-2"
                        style={{ color: categoriaSelecionada?.cor }}
                    >
                        <i
                            className={`${categoriaSelecionada.icone} text-2xl`}
                        ></i>
                        {categoriaSelecionada.nome}
                    </span>
                    <span className="absolute inset-0 flex items-center gap-2 text-black opacity-30">
                        <i
                            className={`${categoriaSelecionada.icone} text-2xl`}
                        ></i>
                        {categoriaSelecionada.nome}
                    </span>
                </div>
            ) : (
                <span className="ml-3 w-full text-start">Selecione</span>
            )}
            <div
                className="absolute inset-0 opacity-15"
                style={{ backgroundColor: categoriaSelecionada?.cor }}
            ></div>
            <i className="ph ph-caret-right mx-3 justify-self-end"></i>
        </button>
    );
});

SelectCategoria.displayName = 'SelectCategoria';

export { SelectCategoria };
