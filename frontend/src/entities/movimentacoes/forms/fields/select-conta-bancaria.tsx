import { useStepper } from '@/entities/stepper/ui/stepper';
import { AvatarBanco } from '@/features/conta-bancaria/ui/shared/avatar-banco';
import { DespesaSchema } from '@/types/models/despesa';
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
            className="relative flex h-9 w-full items-center justify-between gap-2 rounded-md border px-3"
            onClick={() =>
                goToStep({ name: 'lista-contas-bancarias', level: 2 })
            }
        >
            {value ? (
                <span className="flex w-full items-center gap-2">
                    <AvatarBanco banco={value.banco} width={24} height={24} />
                    {value.apelido}
                </span>
            ) : (
                <span className="text-muted">Selecione</span>
            )}
            <i className="ph ph-caret-right justify-self-end"></i>
        </button>
    );
});

SelectContaBancaria.displayName = 'SelectContaBancaria';

export { SelectContaBancaria };
