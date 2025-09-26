import { useStepper } from '@/entities/stepper/ui/stepper';
import { AvatarBanco } from '@/features/conta-bancaria/ui/shared/avatar-banco';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { ContaBancariaSchema } from '../../../../conta-bancaria/lib/conta-bancaria.schema';

type SelectBancosProps = Omit<
    ControllerRenderProps<ContaBancariaSchema, 'banco'>,
    'ref'
>;
const SelectBancos = React.forwardRef<HTMLInputElement, SelectBancosProps>(
    ({ value, ...props }, ref) => {
        const { goToStep } = useStepper();
        return (
            <button
                type="button"
                className="flex items-center justify-between rounded-lg border bg-muted-foreground px-3 py-1"
                onClick={() => goToStep({ name: 'lista-bancos', level: 3 })}
            >
                {value ? (
                    <div className="flex items-center gap-2">
                        <AvatarBanco banco={value} />
                        <span className="flex w-full items-center gap-2">
                            {value.abreviacao}
                        </span>
                    </div>
                ) : (
                    <span className="ml-3 flex w-full items-center gap-2">
                        Selecione um banco
                    </span>
                )}
                <input ref={ref} {...props} type="hidden" />
                <i className="ph ph-caret-right justify-self-end"></i>
            </button>
        );
    },
);

SelectBancos.displayName = 'SelectBancos';

export { SelectBancos };
