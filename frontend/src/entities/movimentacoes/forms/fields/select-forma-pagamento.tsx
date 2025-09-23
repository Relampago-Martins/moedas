'use client';
import { DespesaSchema } from '@/types/models/despesa';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { formasPagamento } from './formas-pag';

type SelectFormaPagamentoProps = ControllerRenderProps<
    DespesaSchema,
    'forma_pagamento'
>;
const SelectFormaPagamento = React.forwardRef<
    HTMLSelectElement,
    Omit<SelectFormaPagamentoProps, 'ref'>
>(({ onChange, value, ...props }, ref) => {
    return (
        <>
            <div className="grid grid-cols-2 gap-3">
                {formasPagamento.map((formaPagamento) => {
                    const active = value === formaPagamento.value;

                    return (
                        <button
                            key={formaPagamento.value}
                            className={`flex items-start justify-between rounded-md border p-3 ${active ? 'border-primary text-primary' : ''}`}
                            onClick={() => onChange(formaPagamento.value)}
                            type="button"
                        >
                            <div className="flex flex-col items-start gap-2">
                                <i
                                    className={`ph ${formaPagamento.iconName} text-xl`}
                                />
                                <span className="text-base">
                                    {formaPagamento.displayName}
                                </span>
                            </div>
                            <div
                                className={`rounded-full border p-[1px] ${active ? 'border-primary bg-primary' : ''}`}
                            >
                                <i
                                    className={`ph ph-check flex text-xs text-primary-foreground ${active ? '' : 'opacity-0'}`}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
            <select value={value} className="hidden">
                {formasPagamento.map((formaPagamento) => (
                    <option
                        key={formaPagamento.value}
                        value={formaPagamento.value}
                    >
                        {formaPagamento.displayName}
                    </option>
                ))}
            </select>
        </>
    );
});

SelectFormaPagamento.displayName = 'SelectFormaPagamento';

export { SelectFormaPagamento };
