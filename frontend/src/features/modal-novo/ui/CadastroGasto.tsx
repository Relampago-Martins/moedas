'use client';
import { criaDespesa } from '@/shared/api/endpoints/despesa-cli';
import { despesa } from '@/shared/lib/forms';
import { Button } from '@/shared/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Despesa } from '@/types/models/despesa';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SelectCategoria } from './select-categoria';
import { SelectFormaPagamento } from './select-forma-pagamento';

export function CadastroGasto() {
    const form = useForm<Despesa>({
        resolver: zodResolver(despesa),
        defaultValues: {
            descricao: '',
            valor: '',
        },
    });

    const onSubmit = async (data: Despesa) => {
        const resp = await criaDespesa(data);
        if (resp.status === 201) {
            alert('Despesa criada com sucesso');
        } else {
            alert('Erro ao criar despesa');
        }
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(onSubmit, console.error)}
            >
                <FormField
                    name="descricao"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    name="valor"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valor</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" />
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
                <Button type="submit">Cadastrar</Button>
            </form>
        </Form>
    );
}
