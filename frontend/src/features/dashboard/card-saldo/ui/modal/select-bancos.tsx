import { useStepper } from '@/entities/stepper/ui/stepper';
import { AvatarBanco } from '@/features/conta-bancaria/ui/shared/avatar-banco';
import { HTMLAttributes } from 'react';
import { CriarContaBancariaSchema } from '../../../../conta-bancaria/lib/conta-bancaria.schema';

type SelectBancosProps = HTMLAttributes<HTMLButtonElement> & {
    value: CriarContaBancariaSchema['banco'];
};
const SelectBancos = ({
    value,
    onClick,
    className,
    ...props
}: SelectBancosProps) => {
    const { goToStep } = useStepper();
    return (
        <button
            type="button"
            className={`flex items-center justify-between rounded-lg border bg-muted-foreground px-3 py-1 ${className}`}
            onClick={(e) => {
                onClick?.(e);
                goToStep({ name: 'lista-bancos', level: 3 });
            }}
            {...props}
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
            <i className="ph ph-caret-right justify-self-end"></i>
        </button>
    );
};

export { SelectBancos };
