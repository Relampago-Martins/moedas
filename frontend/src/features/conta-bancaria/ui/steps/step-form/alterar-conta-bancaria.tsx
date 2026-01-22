'use client';
import { StepperContent, useStepper } from '@/entities/stepper/ui/stepper';
import {
    alterarContaBancariaSchema,
    AlterarContaBancariaSchema,
} from '@/features/conta-bancaria/lib/conta-bancaria.schema';
import { updateContaBancaria } from '@/shared/api/endpoints/conta-bancaria-cli';
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
import { ContaBancariaPreview } from '@/types/models/conta-bancaria';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { PreviousBtn } from '../../shared/previous-btn';

export function StepAlterarContaBancaria() {
    const { goToStep, events } = useStepper();
    const queryClient = useQueryClient();
    const form = useForm<AlterarContaBancariaSchema>({
        resolver: zodResolver(alterarContaBancariaSchema),
        defaultValues: {
            id: undefined,
            apelido: '',
        },
    });

    useEffect(() => {
        events.subscribe('onSelectContaBancaria', (contaBancaria) => {
            if (!contaBancaria) return;
            form.reset({
                id: contaBancaria.id,
                apelido: contaBancaria.apelido,
            });
        });
    }, []);

    const onSubmit = async (data: AlterarContaBancariaSchema) => {
        updateContaBancaria(data.id!, {
            apelido: data.apelido,
        })
            .then((resp) => {
                if ([200, 201].includes(resp.status)) {
                    goToStep({
                        name: 'detalhe-conta-bancaria',
                        level: 1,
                    });
                    queryClient.invalidateQueries({
                        queryKey: ['contaBancaria-' + data.id],
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
        <StepperContent
            value={'edit-conta-bancaria'}
            level={2}
            className="flex flex-col gap-2"
        >
            <div className="flex flex-col">
                <PreviousBtn />
                <h2 className="w-full  text-lg font-semibold">
                    Alterar Apelido
                </h2>
            </div>
            <Form {...form}>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={form.handleSubmit(onSubmit, console.error)}
                >
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

                    <Button className="w-full">Salvar</Button>
                </form>
            </Form>
        </StepperContent>
    );
}
