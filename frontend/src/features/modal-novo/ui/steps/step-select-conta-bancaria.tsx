'use client';
import { StepperContent, useStepper } from '@/entities/stepper/ui/stepper';
import { AvatarBanco } from '@/features/conta-bancaria/ui/shared/avatar-banco';
import { getContasBancarias } from '@/shared/api/endpoints/conta-bancaria-cli';
import { useQuery } from '@tanstack/react-query';
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
                {contas.length > 0 ? (
                    contas.map((conta) => (
                        <button
                            key={conta.id}
                            className="flex w-full items-center gap-4 rounded-md border p-2 hover:bg-muted-foreground"
                            onClick={() => {
                                events.submit('onSelectContaBancaria', conta);
                                previous();
                            }}
                        >
                            <AvatarBanco
                                banco={conta.banco}
                                width={32}
                                height={32}
                            />
                            <div className="flex w-[85%] flex-col items-start justify-start">
                                <span className="">{conta.apelido}</span>
                                <span className="w-full truncate text-start text-muted">
                                    {conta.banco.abreviacao}
                                </span>
                            </div>
                        </button>
                    ))
                ) : (
                    <span className="text-muted-foreground">
                        Nenhuma conta bancária cadastrada.
                    </span>
                )}
            </div>
        </StepperContent>
    );
}
