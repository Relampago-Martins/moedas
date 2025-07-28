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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    ContaBancariaSchema,
    contaBancariaSchema,
    selectContaOpcoes,
} from '../lib/cadastro-conta-bancaria';

export function CadastroContaBancaria() {
    const { goToStep } = useStepper();
    const form = useForm<ContaBancariaSchema>({
        resolver: zodResolver(contaBancariaSchema),
        defaultValues: {
            id: undefined,
            nome: '',
            saldo: 0,
            apelido: '',
        },
    });
    const onSubmit = async (data: ContaBancariaSchema) => {
        // Aqui você pode implementar a lógica para criar ou atualizar a conta bancária
        createContaBancaria({
            nome_banco: data.nome,
            saldo: data.saldo.toString(),
            apelido: data.apelido,
        })
            .then(() => {
                goToStep({
                    name: 'saldo-e-contas',
                    level: 0,
                });
            })
            .catch((error) => {
                alert(`Erro ao criar conta bancária: ${error.message}`); // Exibir mensagem de erro
            });
    };
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <button
                    type="button"
                    className="flex w-full items-center justify-start gap-2 text-muted "
                    onClick={() =>
                        goToStep({
                            name: 'saldo-e-contas',
                            level: 0,
                        })
                    }
                >
                    <i className="ph ph-arrow-left flex"></i>
                    Voltar
                </button>
                <h2 className="text-lg font-semibold">Criar conta bancária</h2>
            </div>

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
                                        placeholder="R$ 0,00"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Banco</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {selectContaOpcoes.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                    <Button className="w-full">Salvar</Button>
                </form>
            </Form>
        </div>
    );
}
