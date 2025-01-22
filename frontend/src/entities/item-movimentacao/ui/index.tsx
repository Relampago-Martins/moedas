'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { TradeDownIcon } from '@/shared/ui/huge-icons/gasto';
import { TradeUpIcon } from '@/shared/ui/huge-icons/receita';
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
            className="w-full overflow-hidden rounded-md border-[1px] bg-card shadow-sm hover:bg-accent"
        >
            <div
                className="flex flex-row items-center gap-3 border-l-4 px-4 py-2 "
                style={{ borderColor: movimentacao.categoria.cor }}
            >
                {movimentacao.tipo === 'D' ? (
                    <div className="rounded-full bg-destructive p-1">
                        <TradeDownIcon className="h-5 w-5 text-destructive-foreground dark:text-foreground" />
                    </div>
                ) : (
                    <div className="rounded-full bg-success p-1">
                        <TradeUpIcon className="h-5 w-5 text-success-foreground dark:text-foreground" />
                    </div>
                )}
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
