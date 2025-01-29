'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { Movimentacao } from '@/types/models/movimentacao';
import { motion } from 'framer-motion';

type ItemMovimentacaoProps = {
    gasto: Movimentacao;
    prefixLayoutId?: string;
    onClick?: () => void;
};

export function ItemMovimentacao({
    gasto: movimentacao,
    prefixLayoutId,
    onClick,
}: ItemMovimentacaoProps) {
    return (
        <motion.button
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            layoutId={`${prefixLayoutId}-${movimentacao.id}`}
            onClick={onClick}
            className="w-full overflow-hidden rounded-md
            border-[1px] bg-card px-1 py-2 shadow-sm hover:bg-accent "
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className={`ml-2 h-[40px] w-2 rounded-md
                    ${movimentacao.tipo === 'R' ? 'bg-success-foreground' : 'bg-destructive-foreground'}
                `}
                ></div>
                <div className="rounded-md p-1">
                    <i
                        className={`${movimentacao.categoria.icone} text-2xl`}
                    ></i>
                </div>
                <div className="">
                    <div className="w-full truncate text-start text-base text-foreground">
                        {movimentacao.descricao}
                    </div>
                    <div className="text-start text-sm text-muted">
                        {numberToCurrency(movimentacao.valor)}
                    </div>
                </div>
            </div>
        </motion.button>
    );
}
