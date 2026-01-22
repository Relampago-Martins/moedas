'use client';

import { useStepper } from '@/entities/stepper/ui/stepper';
import { createContaBancaria } from '@/shared/api/endpoints/conta-bancaria-cli';
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
import { ContaBancariaPreview } from '@/types/models/conta-bancaria';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SelectBancos } from '../../../../dashboard/card-saldo/ui/modal/select-bancos';
import {
    criarContaBancariaSchema,
    CriarContaBancariaSchema,
} from '../../../lib/conta-bancaria.schema';

type Props = {
    banco?: ContaBancariaPreview['banco'];
    contaBancaria?: ContaBancariaPreview | null;
};

export function CriarContaBancaria({ banco, contaBancaria }: Props) {
    const firstIputRef = useRef<HTMLInputElement>(null);
    const { goToStep, events } = useStepper();
    const form = useForm<CriarContaBancariaSchema>({
        resolver: zodResolver(criarContaBancariaSchema),
        defaultValues: {
            id: undefined,
            banco: undefined,
            saldo: 0,
            apelido: '',
        },
    });

    useEffect(() => {
        if (banco) {
            form.setValue('banco', {
                ...banco,
                foto: banco.foto || '',
            });
        }
    }, [banco]);

    useEffect(() => {
        if (contaBancaria) {
            form.reset({
                id: contaBancaria.id,
                banco: {
                    ...contaBancaria.banco,
                    foto: contaBancaria.banco.foto || '',
                },
                saldo: parseFloat(contaBancaria.saldo),
                apelido: contaBancaria.apelido,
            });
        }
    }, [contaBancaria]);

    useEffect(() => {
        setTimeout(() => {
            firstIputRef.current?.focus();
        }, 450);
    }, []);

    const onSubmit = async (data: CriarContaBancariaSchema) => {
        createContaBancaria({
            banco: data.banco.id,
            saldo: data.saldo.toString(),
            apelido: data.apelido,
        })
            .then((resp) => {
                if ([200, 201].includes(resp.status)) {
                    goToStep({
                        name: 'detalhe-conta-bancaria',
                        level: 1,
                    });

                    events.submit(
                        'onSelectContaBancaria',
                        resp.data as ContaBancariaPreview,
                    );
                    toast.success(`Conta bancária criada com sucesso!`, {
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
                                <SelectBancos
                                    value={field.value}
                                    onClick={() => {
                                        console.log('Select banco clicked');
                                    }}
                                />
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
