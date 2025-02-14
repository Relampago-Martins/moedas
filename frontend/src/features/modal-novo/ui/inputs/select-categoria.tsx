'use client';
import { getCategorias } from '@/shared/api/endpoints/categoria-cli';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select';
import { Categoria } from '@/types/models/categoria';
import { DespesaSchema } from '@/types/models/despesa';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

type SelectCategoriaProps = ControllerRenderProps<
    DespesaSchema,
    'categoria'
> & {
    tipoCategoria?: 'D' | 'R';
};

const SelectCategoria = React.forwardRef<
    HTMLSelectElement,
    Omit<SelectCategoriaProps, 'ref'>
>(({ onChange, value, tipoCategoria = 'D', ...props }, ref) => {
    const [categorias, setCategorias] = React.useState<Categoria[]>([]);
    React.useEffect(() => {
        getCategorias(tipoCategoria).then((data) => {
            setCategorias(data);
        });
    }, []);

    return (
        <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger>
                <SelectValue placeholder="Selecione" ref={ref} {...props} />
            </SelectTrigger>
            <SelectContent className="sm:max-h-[15rem]">
                {categorias.map((categoria) => (
                    <SelectItem key={categoria.sigla} value={categoria.sigla}>
                        <div className="flex flex-row items-center gap-2">
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
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
});

SelectCategoria.displayName = 'SelectCategoria';

export { SelectCategoria };
