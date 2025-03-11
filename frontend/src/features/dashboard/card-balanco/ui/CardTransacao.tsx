import { HTMLAttributes } from 'react';
import './ui.scss';

type CardTransacaoProps = HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

export function CardTransacao({
    children,
    className,
    ...props
}: CardTransacaoProps) {
    return (
        <div className={`cardTransicao h-8 text-sm ${className}`} {...props}>
            {children}
        </div>
    );
}
