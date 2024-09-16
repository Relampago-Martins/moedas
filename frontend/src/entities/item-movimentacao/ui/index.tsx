'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { GastoIcon } from '@/shared/ui/huge-icons/gasto';
import { ReceitaIcon } from '@/shared/ui/huge-icons/receita';
import { Movimentacao } from '@/types/models/movimentacao';
import { motion } from 'framer-motion';

type ItemMovimentacaoProps = {
    gasto: Movimentacao;
    prefixLayoutId?: string;
};

export function ItemMovimentacao({
    gasto: movimentacao,
    prefixLayoutId,
}: ItemMovimentacaoProps) {
    return (
        <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            layoutId={`${prefixLayoutId}-${movimentacao.id}`}
            style={{ borderColor: movimentacao.categoria.cor }}
            onMouseOver={(event) => {
                if (movimentacao.categoria) {
                    event.currentTarget.style.backgroundColor =
                        movimentacao.categoria.cor + '15';
                }
            }}
            onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = 'var(--card)';
            }}
            className="flex w-full flex-row items-center rounded-sm border-l-4 bg-card py-2"
        >
            <div className="pl-2 pr-3 text-sm">
                {movimentacao.tipo === 'D' ? (
                    <GastoIcon className="h-4 w-4 text-red-700" />
                ) : (
                    <ReceitaIcon className="h-4 w-4 text-green-700" />
                )}
            </div>
            <div className="flex flex-col items-start">
                <div className="w-full truncate  text-base">
                    {movimentacao.descricao}
                </div>
                <div className="text-sm opacity-70">
                    {numberToCurrency(movimentacao.valor)}
                </div>
            </div>
        </motion.button>
    );
}
