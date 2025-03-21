'use client';
import {
    atualizaReceita,
    criaReceita,
} from '@/shared/api/endpoints/receita-cli';
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
import { ReceitaSchema } from '@/types/models/receita';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { getNomeReceitaAleatoria } from '../../../features/modal-novo/lib/utils';
import { SelectCategoria } from './fields/select-categoria';

type FormReceitaProps = {
    formState: UseFormReturn<ReceitaSchema>;
    onSucess: () => void;
};

export function FormReceita({ formState: form, onSucess }: FormReceitaProps) {
    const randomName = useMemo(() => getNomeReceitaAleatoria(), []);
    const queryClient = useQueryClient();
    const formId = useMemo(() => form.getValues('id'), [form]);

    const onSubmit = async (data: ReceitaSchema) => {
        const resp = formId
            ? await atualizaReceita(formId, data)
            : await criaReceita(data);
        if ([200, 201].includes(resp.status)) {
            queryClient.invalidateQueries({ queryKey: ['movimentacoes'] });
            toast.success(`Receita '${data.descricao}' criada com sucesso!`, {
                duration: 4000,
            });
            onSucess();
        } else {
            toast.error('Erro ao criar receita, tente novamente mais tarde');
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
                                <SelectCategoria tipo="R" {...field} />
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
