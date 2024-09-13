'use client';
import { getDespesaConfigs } from '@/shared/api/endpoints/despesa-cli';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select';
import { APIChoice, DespesaSchema } from '@/types/models/despesa';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

type SelectFormaPagamentoProps = ControllerRenderProps<
    DespesaSchema,
    'forma_pagamento'
>;
const SelectFormaPagamento = React.forwardRef<
    HTMLSelectElement,
    Omit<SelectFormaPagamentoProps, 'ref'>
>(({ onChange, value, ...props }, ref) => {
    const [formasPagamento, setFormasPagamento] = React.useState<APIChoice[]>(
        [],
    );
    React.useEffect(() => {
        getDespesaConfigs().then((data) => {
            setFormasPagamento(data.actions.POST.forma_pagamento.choices);
        });
    }, []);

    return (
        <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger>
                <SelectValue placeholder="selecione" ref={ref} {...props} />
            </SelectTrigger>
            <SelectContent>
                {formasPagamento.map((formaPagamento) => (
                    <SelectItem
                        key={formaPagamento.value}
                        value={formaPagamento.value}
                    >
                        {formaPagamento.display_name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
});

SelectFormaPagamento.displayName = 'SelectFormaPagamento';

export { SelectFormaPagamento };
