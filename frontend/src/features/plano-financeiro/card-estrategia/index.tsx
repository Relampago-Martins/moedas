'use client';

import { criarEstrategia } from '@/shared/api/endpoints/estrategia';
import {
    EstrategiaFormData,
    EstrategiaSchema,
} from '@/shared/lib/forms/estrategia.schema';
import { Button } from '@/shared/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/shared/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Estrategia } from '@/types/models/estrategia';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CardEstrategiaProps {
    estrategia: Estrategia | null;
    onEstrategiaUpdate: (novaEstrategia: Estrategia) => void;
}

function isEstrategia(obj: any): obj is Estrategia {
    return (
        obj &&
        typeof obj.id === 'number' &&
        typeof obj.percentual_gastos === 'number' &&
        typeof obj.percentual_investimentos === 'number' &&
        typeof obj.percentual_dividas === 'number' &&
        typeof obj.percentual_reserva === 'number'
    );
}

export function CardEstrategia({
    estrategia,
    onEstrategiaUpdate,
}: CardEstrategiaProps) {
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<EstrategiaFormData>({
        resolver: zodResolver(EstrategiaSchema),
        defaultValues: {
            percentual_gastos: estrategia?.percentual_gastos ?? 0,
            percentual_investimentos: estrategia?.percentual_investimentos ?? 0,
            percentual_dividas: estrategia?.percentual_dividas ?? 0,
            percentual_reserva: estrategia?.percentual_reserva ?? 0,
        },
    });

    useEffect(() => {
        if (estrategia) {
            form.reset({
                percentual_gastos: estrategia.percentual_gastos,
                percentual_investimentos: estrategia.percentual_investimentos,
                percentual_dividas: estrategia.percentual_dividas,
                percentual_reserva: estrategia.percentual_reserva,
            });
        } else {
            form.reset({
                percentual_gastos: 0,
                percentual_investimentos: 0,
                percentual_dividas: 0,
                percentual_reserva: 0,
            });
        }
    }, [estrategia, form]);

    const onSubmit = async (data: EstrategiaFormData) => {
        try {
            const idParaSalvar = estrategia?.id || 0;

            const resultadoApi = await criarEstrategia({
                id: idParaSalvar,
                ...data,
            });

            if (isEstrategia(resultadoApi)) {
                toast.success('Estratégia salva com sucesso.');
                setIsEditing(false);
                onEstrategiaUpdate(resultadoApi);
            } else {
                const errorMessage =
                    (resultadoApi as any)?.message ||
                    'Não foi possível processar sua solicitação.';
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error('Erro ao salvar estratégia:', error);
            toast.error(
                'Não foi possível salvar a estratégia. Tente novamente mais tarde.',
            );
        }
    };

    if (!estrategia && !isEditing) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Estratégia Financeira</CardTitle>
                    <CardDescription>
                        Nenhuma estratégia definida ainda. Clique em definir
                        para começar.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button onClick={() => setIsEditing(true)}>
                        Definir Estratégia
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    if (isEditing) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Editar Estratégia Financeira</CardTitle>
                    <CardDescription>
                        Defina os percentuais para suas finanças. A soma deve
                        ser 100%.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="percentual_gastos"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gastos (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Ex: 40"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="percentual_investimentos"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Investimentos (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Ex: 30"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="percentual_dividas"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dívidas (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Ex: 15"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="percentual_reserva"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reserva (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Ex: 15"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {form.formState.errors.root && (
                                <p className="text-sm font-medium text-destructive">
                                    {form.formState.errors.root.message}
                                </p>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsEditing(false);
                                    if (estrategia) {
                                        form.reset({
                                            percentual_gastos:
                                                estrategia.percentual_gastos,
                                            percentual_investimentos:
                                                estrategia.percentual_investimentos,
                                            percentual_dividas:
                                                estrategia.percentual_dividas,
                                            percentual_reserva:
                                                estrategia.percentual_reserva,
                                        });
                                    } else {
                                        form.reset({
                                            percentual_gastos: 0,
                                            percentual_investimentos: 0,
                                            percentual_dividas: 0,
                                            percentual_reserva: 0,
                                        });
                                    }
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting
                                    ? 'Salvando...'
                                    : 'Salvar'}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Minha Estratégia Financeira</CardTitle>
                <CardDescription>
                    Seus percentuais de alocação definidos.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <p>
                    <strong>Gastos:</strong> {estrategia.percentual_gastos}%
                </p>
                <p>
                    <strong>Investimentos:</strong>{' '}
                    {estrategia.percentual_investimentos}%
                </p>
                <p>
                    <strong>Dívidas:</strong> {estrategia.percentual_dividas}%
                </p>
                <p>
                    <strong>Reserva:</strong> {estrategia.percentual_reserva}%
                </p>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={() => setIsEditing(true)}>
                    Editar Estratégia
                </Button>
            </CardFooter>
        </Card>
    );
}
