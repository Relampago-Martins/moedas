import { numberToCurrency } from '@/shared/lib/utils';

export function MoneyTile({
    title,
    value,
    className,
}: {
    title?: string;
    value: number;
    className?: string;
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
            <div className="flex items-center ">
                <span className="mr-1 mt-1 text-base font-normal">
                    {negative ? '- ' : ''}
                    R$
                </span>
                <div className="shrink-0 text-2xl font-semibold">
                    {cleanedVal}
                </div>
            </div>
        </div>
    );
}
