'use client';
import {
    atualizaDespesa,
    criaDespesa,
} from '@/shared/api/endpoints/despesa-cli';
import { despesa } from '@/shared/lib/forms';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { getNomeDespesaAleatoria } from '../../lib/utils';
import { SelectCategoria } from '../inputs/select-categoria';
import { SelectFormaPagamento } from '../inputs/select-forma-pagamento';
import { DialogOrDrawerHeader } from '../step-header';
import { StepObject, useStepper } from '../stepper';

type FormDespesaProps = {
    onSucess: () => void;
    formValues?: DespesaSchema;
    stepBack: StepObject<string>;
};

export function FormDespesa({
    onSucess,
    formValues,
    stepBack,
}: FormDespesaProps) {
    const randomName = useMemo(() => getNomeDespesaAleatoria(), []);
    const { goToStep } = useStepper();
    const queryClient = useQueryClient();
    const form = useForm<DespesaSchema>({
        resolver: zodResolver(despesa),
        defaultValues: formValues,
    });

    const onSubmit = async (data: DespesaSchema) => {
        const resp = formValues?.id
            ? await atualizaDespesa(formValues.id, data)
            : await criaDespesa(data);
        if ([200, 201].includes(resp.status)) {
            queryClient.invalidateQueries({ queryKey: ['movimentacoes'] });
            toast.success(
                `Despesa '${data.descricao}' ${formValues?.id ? 'atualizada' : 'criada'}
                 com sucesso!`,
                {
                    duration: 4000,
                },
            );
            onSucess();
        } else if (resp.status === 400) {
            toast.error('Erro ao criar despesa, tente novamente mais tarde');
        }
    };

    return (
        <>
            <DialogOrDrawerHeader
                title={formValues ? 'Editar Despesa' : 'Nova Despesa'}
                onBack={() => goToStep(stepBack)}
            />
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
                                    <SelectCategoria
                                        {...field}
                                        tipoCategoria="D"
                                    />
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />
                    <button
                        type="button"
                        onClick={() =>
                            goToStep({ name: 'lista-categorias', level: 2 })
                        }
                    >
                        categorias
                    </button>
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
        </>
    );
}
