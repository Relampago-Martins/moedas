'use client';
import {
    atualizaDespesa,
    criaDespesa,
} from '@/shared/api/endpoints/despesa-cli';
import { Button } from '@/shared/ui/button';
import { CurrencyInput } from '@/shared/ui/currency';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { DespesaSchema } from '@/types/models/despesa';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { getNomeDespesaAleatoria } from '../../../features/modal-novo/lib/utils';
import { SelectCategoria } from './fields/select-categoria';
import { SelectFormaPagamento } from './fields/select-forma-pagamento';

type FormDespesaProps = {
    onSucess?: () => void;
    formState: UseFormReturn<DespesaSchema>;
};

export function FormDespesa({ onSucess, formState: form }: FormDespesaProps) {
    const randomName = useMemo(() => getNomeDespesaAleatoria(), []);
    const queryClient = useQueryClient();
    const formId = useMemo(() => form.getValues('id'), [form]);

    const onSubmit = async (data: DespesaSchema) => {
        const resp = formId
            ? await atualizaDespesa(formId, data)
            : await criaDespesa(data);
        if ([200, 201].includes(resp.status)) {
            queryClient.invalidateQueries({ queryKey: ['movimentacoes'] });
            toast.success(
                `Despesa '${data.descricao}' ${formId ? 'atualizada' : 'criada'}
                 com sucesso!`,
                {
                    duration: 4000,
                },
            );
            onSucess?.();
        } else if (resp.status === 400) {
            toast.error('Erro ao criar despesa, tente novamente mais tarde');
        }
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit, console.error)}
            >
                <FormField
                    name="valor"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valor</FormLabel>
                            <FormControl>
                                <CurrencyInput
                                    {...field}
                                    placeholder="R$ 0,00"
                                />
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    name="descricao"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={`ex: ${randomName}`}
                                />
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    name="categoria"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <FormControl>
                                <SelectCategoria {...field} />
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    name="forma_pagamento"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Forma de Pagamento</FormLabel>
                            <FormControl>
                                <SelectFormaPagamento {...field} />
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />
                <Button type="submit">Salvar</Button>
            </form>
        </Form>
    );
}
