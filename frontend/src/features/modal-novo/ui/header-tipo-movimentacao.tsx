import { cn } from '@/shared/lib/utils';

type TipoMovimentacao = 'despesa' | 'receita';

/** Cores que despesa e receita já usam no app, agora como fundo sólido. */
const ESTILO: Record<TipoMovimentacao, { fundo: string; seta: string }> = {
    despesa: { fundo: 'bg-destructive-foreground', seta: 'ph-trend-down' },
    receita: { fundo: 'bg-success-foreground', seta: 'ph-trend-up' },
};

/**
 * Setas espalhadas no fundo do header, fixas (sem animação): para baixo na
 * despesa (dinheiro saindo), para cima na receita (dinheiro entrando).
 * Posições em %, tamanho em rem, opacidade de 0 a 1.
 */
const SETAS = [
    { left: 4, top: 18, size: 1.75, opacity: 0.25 },
    { left: 16, top: 52, size: 1.1, opacity: 0.18 },
    { left: 30, top: 8, size: 0.9, opacity: 0.2 },
    { left: 44, top: 58, size: 1.5, opacity: 0.15 },
    { left: 60, top: 14, size: 1.2, opacity: 0.22 },
    { left: 72, top: 50, size: 2, opacity: 0.16 },
    { left: 86, top: 10, size: 1, opacity: 0.24 },
    { left: 93, top: 56, size: 1.3, opacity: 0.18 },
];

type HeaderTipoMovimentacaoProps = {
    tipo: TipoMovimentacao;
    children: React.ReactNode;
    className?: string;
};

/**
 * Faixa de cor sólida no topo do modal de despesa ou receita, encostada nas
 * bordas, para o usuário reconhecer o contexto de relance. As margens
 * negativas desfazem o padding do modal (`p-6`) e do drawer (`px-4`).
 */
export function HeaderTipoMovimentacao({
    tipo,
    children,
    className,
}: HeaderTipoMovimentacaoProps) {
    const { fundo, seta } = ESTILO[tipo];

    return (
        <div
            className={cn(
                'relative -mx-4 mb-4 overflow-hidden px-4 pt-4 text-white lg:-mx-6 lg:-mt-6 lg:px-6 lg:pt-6',
                // Botões de voltar e fechar continuam legíveis sobre a cor.
                '[&_button]:hover:bg-white/15 [&_button]:hover:text-white',
                fundo,
                className,
            )}
        >
            <div aria-hidden className="pointer-events-none absolute inset-0">
                {SETAS.map(({ left, top, size, opacity }) => (
                    <i
                        key={`${left}-${top}`}
                        className={`ph-bold ${seta} absolute`}
                        style={{
                            left: `${left}%`,
                            top: `${top}%`,
                            fontSize: `${size}rem`,
                            opacity,
                        }}
                    />
                ))}
            </div>
            <div className="relative">{children}</div>
        </div>
    );
}
