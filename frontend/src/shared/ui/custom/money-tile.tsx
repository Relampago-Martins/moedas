import { numberToCurrency } from '@/shared/lib/utils';
import { cva } from 'class-variance-authority';

const tileVariantsValue = cva('shrink-0 text-2xl font-semibold', {
    variants: {
        size: {
            md: 'text-lg',
            xl: 'text-2xl',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

const tileVariantsRS = cva('mr-1 mt-1 font-normal', {
    variants: {
        size: {
            md: 'text-sm',
            xl: 'text-base',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

export function MoneyTile({
    title,
    value,
    className,
    size = 'md',
    trailing,
}: {
    title?: string;
    value: number;
    className?: string;
    trailing?: React.ReactNode;
    size?: 'md' | 'xl';
}) {
    const negative = value < 0;
    const cleanedVal = numberToCurrency(Math.abs(value))
        .replace('R$', '')
        .trim();

    return (
        <div className={`flex flex-col ${className}`}>
            {title && (
                <span className="w-full text-base font-normal">{title}</span>
            )}
            <div className="flex w-full items-center">
                <span className={tileVariantsRS({ size })}>
                    {negative ? '- ' : ''}
                    R$
                </span>
                <div className={tileVariantsValue({ size })}>{cleanedVal}</div>
                {trailing && (
                    <div className="ml-4 flex items-center">{trailing}</div>
                )}
            </div>
        </div>
    );
}
