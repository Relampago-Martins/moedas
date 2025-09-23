import { numberToCurrency } from '@/shared/lib/utils';
import { cva } from 'class-variance-authority';

const tileVariantsValue = cva('shrink-0 font-semibold', {
    variants: {
        size: {
            md: 'text-lg',
            xl: 'text-xl',
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
                <span className={'w-full text-lg font-semibold'}>{title}</span>
            )}
            <div className="flex w-full items-center">
                <div className={tileVariantsValue({ size })}>
                    {`${negative ? '- ' : ''}R$ `}
                    {cleanedVal}
                </div>
                {trailing && (
                    <div className="ml-4 flex w-full items-center justify-end">
                        {trailing}
                    </div>
                )}
            </div>
        </div>
    );
}
