import './ui.scss';

type CardTransacaoProps = {
    children?: React.ReactNode;
}

export function CardTransacao({children}: CardTransacaoProps){
    return (
        <div className="cardTransicao bg-background text-foreground text-sm h-8 border border-input">
            {children}
        </div>
    );
}