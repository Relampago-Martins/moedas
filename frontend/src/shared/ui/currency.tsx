import { cn } from '@/shared/lib/utils';
import React, { HTMLProps, useState } from 'react';

type CurrencyInputProps = HTMLProps<HTMLInputElement> & {
    value: number;
    onChange: (value: number) => void;
};

const DENOMINADOR_DECIMAL = 100;
const formatador = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    minimumFractionDigits: 2,
});

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
    ({ className, onChange, value = 0, ...props }, ref) => {
        const [displayValue, setDisplayValue] = useState<string>(
            `R$ ${formatador.format(value)}`,
        );

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            // Remove todos os caracteres não numéricos
            const value = parseFloat(
                event.target.value
                    .replace('.', '')
                    .replace(',', '')
                    .replace(/\D/g, ''),
            );
            const result = formatador.format(value / DENOMINADOR_DECIMAL);
            const valorHidden = result.replaceAll('.', '').replaceAll(',', '.');

            setDisplayValue(`R$ ${result}`);
            onChange(parseFloat(valorHidden));
        };

        return (
            <>
                <input
                    className={cn(
                        `h-9 w-full rounded-none border-b border-primary bg-transparent py-1
                        text-xl focus:outline-none`,
                        className,
                    )}
                    inputMode="numeric"
                    defaultValue={value}
                    value={displayValue}
                    onInput={handleChange}
                    {...props}
                />
                <input
                    ref={ref}
                    type="hidden"
                    name={props.name}
                    value={value}
                    {...props}
                />
            </>
        );
    },
);

CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };
