'use client';
import { getDespesaConfigs } from '@/shared/api/endpoints/despesa-cli';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select';
import { APIChoice, Despesa } from '@/types/models/despesa';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

type SelectCategoriaProps = ControllerRenderProps<Despesa, 'categoria'>;
const SelectCategoria = React.forwardRef<
    HTMLSelectElement,
    Omit<SelectCategoriaProps, 'ref'>
>(({ onChange, value, ...props }, ref) => {
    const [categorias, setCategorias] = React.useState<APIChoice[]>([]);
    React.useEffect(() => {
        getDespesaConfigs().then((data) => {
            setCategorias(data.actions.POST.categoria.choices);
        });
    }, []);

    return (
        <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger>
                <SelectValue
                    placeholder="Forma de Pagamento X"
                    ref={ref}
                    {...props}
                />
            </SelectTrigger>
            <SelectContent>
                {categorias.map((categoria) => (
                    <SelectItem key={categoria.value} value={categoria.value}>
                        {categoria.display_name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
});

SelectCategoria.displayName = 'SelectCategoria';

export { SelectCategoria };
