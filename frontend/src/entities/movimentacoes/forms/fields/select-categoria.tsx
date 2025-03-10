'use client';
import { useStepper } from '@/entities/stepper/ui/stepper';
import { Categoria } from '@/types/models/categoria';
import { DespesaSchema } from '@/types/models/despesa';
import React from 'react';
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

    return (
        <button
            type="button"
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
            {value ? (
                <div className="relative ml-3 w-full">
                    <span
                        className="flex items-center  gap-2"
                        style={{ color: value?.cor }}
                    >
                        <i className={`${value.icone} text-2xl`}></i>
                        {value.nome}
                    </span>
                    <span className="absolute inset-0 flex items-center gap-2 text-black opacity-30">
                        <i className={`${value.icone} text-2xl`}></i>
                        {value.nome}
                    </span>
                </div>
            ) : (
                <span className="ml-3 w-full text-start">Selecione</span>
            )}
            <div
                className="absolute inset-0 opacity-15"
                style={{ backgroundColor: value?.cor }}
            ></div>
            <i className="ph ph-caret-right mx-3 justify-self-end"></i>
            <input {...props} type="hidden" />
        </button>
    );
});

SelectCategoria.displayName = 'SelectCategoria';

export { SelectCategoria };
