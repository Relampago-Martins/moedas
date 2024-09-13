import { cn } from '@/shared/lib/utils';
import React from 'react';
import * as CurrencyPrimitive from 'react-currency-input-field';
import { ControllerRenderProps } from 'react-hook-form';

type CurrencyInputProps = CurrencyPrimitive.CurrencyInputProps &
    ControllerRenderProps;

const CurrencyInput = React.forwardRef<
    React.ElementRef<typeof CurrencyPrimitive.default>,
    Omit<CurrencyInputProps, 'ref'>
>(({ className, onChange, value, ...props }, ref) => {
    return (
        <CurrencyPrimitive.default
            ref={ref}
            className={cn(
                `h-9 w-full rounded-none border-b border-primary bg-transparent py-1
                text-xl
                focus:outline-none`,
                className,
            )}
            defaultValue={value}
            decimalSeparator=","
            fixedDecimalLength={2}
            type="decimal"
            groupSeparator="."
            prefix={'R$ '}
            onValueChange={(_, __, values) => onChange(values?.float)}
            {...props}
        />
    );
});

CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };
