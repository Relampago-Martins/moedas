'use client';

import { useStepper } from '@/entities/stepper/ui/stepper';
import { createOrUpdateContaBancaria } from '@/shared/api/endpoints/conta-bancaria-cli';
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
import { ContaBancaria } from '@/types/models/conta-bancaria';
import { useEffect, useMemo, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { ContaBancariaSchema } from '../../lib/cadastro-conta-bancaria';
import { SelectBancos } from './select-bancos';

type CadastroContaBancariaProps = {
    formState: UseFormReturn<ContaBancariaSchema>;
};

export function FormContaBancaria({
    formState: form,
}: CadastroContaBancariaProps) {
    const firstIputRef = useRef<HTMLInputElement>(null);
    const formId = useMemo(() => form.getValues('id'), [form]);

    const { goToStep, events } = useStepper();

    useEffect(() => {
        setTimeout(() => {
            firstIputRef.current?.focus();
        }, 450);
    }, []);

    const onSubmit = async (data: ContaBancariaSchema) => {
        createOrUpdateContaBancaria(formId, {
            banco_id: data.banco.id,
            saldo: data.saldo.toString(),
            apelido: data.apelido,
        })
            .then((resp) => {
                if ([200, 201].includes(resp.status)) {
                    goToStep(
                        formId
                            ? {
                                  name: 'detalhe-conta-bancaria',
                                  level: 1,
                              }
                            : {
                                  name: 'saldo-e-contas',
                                  level: 0,
                              },
                    );
                    const action = formId ? 'atualizada' : 'criada';

                    events.submit(
                        'onSelectContaBancaria',
                        resp.data as ContaBancaria,
                    );
                    toast.success(`Conta bancária ${action} com sucesso!`, {
                        duration: 4000,
                    });
                } else {
                    toast.error(
                        'Erro ao criar conta bancária, tente novamente mais tarde',
                        {
                            duration: 4000,
                        },
                    );
                }
            })
            .catch((error) => {
                alert(`Erro ao criar conta bancária: ${error.message}`); // Exibir mensagem de erro
            });
    };
    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(onSubmit, console.error)}
            >
                <FormField
                    control={form.control}
                    name="saldo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Saldo inicial</FormLabel>
                            <FormControl>
                                <CurrencyInput
                                    {...field}
                                    ref={firstIputRef}
                                    placeholder="R$ 0,00"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="apelido"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apelido</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Apelido da conta"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="banco"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Banco</FormLabel>
                            <FormControl>
                                <SelectBancos {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full">Salvar</Button>
            </form>
        </Form>
    );
}
