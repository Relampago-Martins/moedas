import { HTMLAttributes } from 'react';
import './ui.scss';

type CardTransacaoProps = HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
}

export function CardTransacao({children, className, ...props}: CardTransacaoProps){
    return (
        <div className={`cardTransicao text-foreground text-sm h-8 ${className}`}
            {...props}>
            {children}
        </div>
    );
}