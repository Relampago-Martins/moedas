'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { Despesa } from '@/types/models/despesa';
import { motion } from 'framer-motion';

type ItemGastoProps = {
    gasto: Despesa;
    prefixLayoutId?: string;
};

export function ItemGasto({ gasto, prefixLayoutId }: ItemGastoProps) {
    return (
        <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            layoutId={`${prefixLayoutId}-${gasto.id}`}
            className="flex w-full flex-col items-start rounded-sm border-l-4 bg-card px-4 py-2 "
            style={{ borderColor: gasto.categoria.cor }}
            onMouseOver={(event) => {
                if (gasto.categoria) {
                    event.currentTarget.style.backgroundColor =
                        gasto.categoria.cor + '15';
                }
            }}
            onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = 'var(--card)';
            }}
        >
            <div className="w-full truncate text-start text-base">
                {gasto.descricao}
            </div>
            <div className="text-sm opacity-70">
                {numberToCurrency(gasto.valor)}
            </div>
        </motion.button>
    );
}
