'use client';
import { useStepper } from '@/entities/stepper/ui/stepper';
import { Categoria } from '@/types/models/categoria';
import { DespesaSchema } from '@/types/models/despesa';
import { useTheme } from 'next-themes';
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
    const isDarkMode = useTheme().theme === 'dark';

    return (
        <button
            type="button"
            className="relative flex h-9 items-center rounded-md border"
            style={{
                backgroundColor: value?.cor.fundo_com_opacidade,
                color: isDarkMode ? value?.cor.fundo : value?.cor.texto,
            }}
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
                <span className="ml-3 flex w-full items-center gap-2">
                    <i className={`${value.icone} text-2xl`}></i>
                    {value.nome}
                </span>
            ) : (
                <span className="ml-3 w-full text-start">Selecione</span>
            )}
            <i className="ph ph-caret-right mx-3 justify-self-end"></i>
            <input {...props} type="hidden" />
        </button>
    );
});

SelectCategoria.displayName = 'SelectCategoria';

export { SelectCategoria };
