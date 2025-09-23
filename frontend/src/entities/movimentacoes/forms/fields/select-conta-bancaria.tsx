import { useStepper } from '@/entities/stepper/ui/stepper';
import { DespesaSchema } from '@/types/models/despesa';
import Image from 'next/image';
import { forwardRef } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

type SelectContaBancariaProps = ControllerRenderProps<
    DespesaSchema,
    'contaBancaria'
>;

const SelectContaBancaria = forwardRef<
    HTMLSelectElement,
    Omit<SelectContaBancariaProps, 'ref'>
>(({ onChange, value, ...props }, ref) => {
    const { goToStep } = useStepper();

    return (
        <button
            type="button"
            className="relative flex h-9 w-full items-center rounded-md border"
            onClick={() =>
                goToStep({ name: 'lista-contas-bancarias', level: 2 })
            }
        >
            {value ? (
                <span className="ml-3 flex w-full items-center gap-2">
                    {value.banco.foto && (
                        <Image
                            src={value.banco.foto}
                            alt={value.banco.nome}
                            width={20}
                            height={20}
                            className="h-5 w-5 rounded-full"
                        />
                    )}
                    {value.apelido}
                </span>
            ) : (
                <span className="flex w-full items-center justify-between gap-2 px-3">
                    <span className="text-muted">Selecione</span>
                    <i className="ph ph-caret-right justify-self-end"></i>
                </span>
            )}
        </button>
    );
});

SelectContaBancaria.displayName = 'SelectContaBancaria';

export { SelectContaBancaria };
