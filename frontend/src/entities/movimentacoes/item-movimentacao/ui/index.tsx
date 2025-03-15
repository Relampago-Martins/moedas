'use client';
import { getDateFromISO, numberToCurrency } from '@/shared/lib/utils';
import { Separator } from '@/shared/ui/separator';
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
    const isSolid = getDateFromISO(movimentacao.data) < new Date();
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            layoutId={`${prefixLayoutId}-${movimentacao.id}`}
            onClick={onClick}
            className={`h-16 w-full overflow-hidden
            rounded-md border-[1px] bg-card pr-4 shadow-sm hover:bg-accent
            ${isSolid ? 'border-solid' : 'border-dashed'}`}
        >
            <div className="flex w-full flex-row items-center gap-3">
                <div
                    className={`relative flex h-16 w-14 shrink-0 items-center justify-center`}
                >
                    <i
                        className={`${movimentacao.categoria.icone} z-[1] text-2xl 
                            ${movimentacao.tipo === 'R' ? 'text-success-foreground' : 'text-destructive-foreground'}
                        `}
                    ></i>

                    <div
                        className={`absolute inset-0 z-0 w-full opacity-70 dark:opacity-20 ${movimentacao.tipo === 'R' ? 'bg-success' : 'bg-destructive'}`}
                    ></div>
                </div>
                <div className="w-full">
                    <div className="flex flex-row items-center justify-between gap-2">
                        <div className="line-clamp-1 w-full overflow-hidden text-ellipsis text-start text-foreground sm:text-lg">
                            {movimentacao.descricao}
                        </div>
                        <div
                            className={`w-fit shrink-0 text-end text-sm
                        ${movimentacao.tipo === 'R' ? 'text-success-foreground' : 'text-destructive-foreground'}
                    `}
                        >
                            {movimentacao.tipo === 'R' ? '' : '-'}
                            {numberToCurrency(movimentacao.valor)}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-start text-sm text-muted">
                            {movimentacao.categoria.nome}
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="truncate text-start text-sm text-muted">
                            Nubank - C.Corrente
                        </div>
                    </div>
                </div>
            </div>
        </motion.button>
    );
}
