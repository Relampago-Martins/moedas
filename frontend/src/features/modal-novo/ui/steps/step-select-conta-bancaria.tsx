'use client';
import { StepperContent, useStepper } from '@/entities/stepper/ui/stepper';
import { getContasBancarias } from '@/shared/api/endpoints/conta-bancaria-cli';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { DialogOrDrawerHeader } from '../step-header';

export function StepSelectContaBancaria() {
    const { data: contas = [] } = useQuery({
        queryKey: ['contas-bancarias'],
        queryFn: async () => {
            const response = await getContasBancarias();
            return response.data || [];
        },
        refetchOnWindowFocus: false,
    });
    const { previous, events } = useStepper();

    return (
        <StepperContent
            value="lista-contas-bancarias"
            level={2}
            className="md:w-[25rem]"
        >
            <DialogOrDrawerHeader
                title={'Selecionar Conta Bancária'}
                onBack={() => previous()}
            />
            <div className="flex w-full flex-col gap-2">
                {contas.map((conta) => (
                    <button
                        key={conta.id}
                        className="flex w-full items-center gap-4 rounded-md border p-2 hover:bg-muted-foreground"
                        onClick={() => {
                            events.submit('onSelectContaBancaria', conta);
                            previous();
                        }}
                    >
                        {conta.banco.foto && (
                            <Image
                                src={conta.banco.foto}
                                alt={conta.banco.nome}
                                width={40}
                                height={40}
                                className="h-8 w-8 rounded-full"
                            />
                        )}
                        <div className="flex w-[85%] flex-col items-start justify-start">
                            <span className="">{conta.apelido}</span>
                            <span className="w-full truncate text-start text-muted">
                                {conta.banco.abreviacao}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </StepperContent>
    );
}
