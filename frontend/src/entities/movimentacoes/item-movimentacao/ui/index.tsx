'use client';
import { getDateFromISO, numberToCurrency } from '@/shared/lib/utils';
import { Separator } from '@/shared/ui/separator';
import { Movimentacao } from '@/types/models/movimentacao';
import {
    EXPANSION_TRANSITION,
    expandableDialogLayoutId,
    triggerLayoutDependency,
} from '@/shared/ui/custom/expandable-dialog';
import { motion } from 'motion/react';

/** `id` do modal que sai deste item; ver `ModalMovimentacao`. */
export function getItemMovimentacaoOrigemId(prefix: string, id: number) {
    return `${prefix}-${id}`;
}

type ItemMovimentacaoProps = {
    gasto: Movimentacao;
    /** Com prefixo, o item vira a origem do morph do modal de movimentação. */
    prefixLayoutId?: string;
    onClick?: () => void;
    withBank?: boolean;
    /** Se o modal que saiu deste item está aberto. */
    expanded?: boolean;
};

export function ItemMovimentacao({
    gasto: movimentacao,
    prefixLayoutId,
    withBank = true,
    onClick,
    expanded = false,
}: ItemMovimentacaoProps) {
    const isSolid = getDateFromISO(movimentacao.data) < new Date();

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            layoutId={
                prefixLayoutId
                    ? expandableDialogLayoutId(
                          getItemMovimentacaoOrigemId(
                              prefixLayoutId,
                              movimentacao.id,
                          ),
                      )
                    : undefined
            }
            layoutDependency={triggerLayoutDependency(expanded)}
            // A volta do modal é conduzida por este item, fora do diálogo.
            transition={EXPANSION_TRANSITION}
            // Raio em `style` para o Motion contra-escalar as quinas no morph.
            style={{ borderRadius: 6 }}
            onClick={onClick}
            className={`h-16 w-full overflow-hidden border bg-card pr-4 shadow-xs hover:bg-accent ${isSolid ? 'border-solid' : 'border-dashed'}`}
        >
            <div className="flex w-full flex-row items-center gap-3">
                <div
                    className={`relative flex h-16 w-14 shrink-0 items-center justify-center`}
                >
                    <i
                        className={`${movimentacao.categoria.icone} z-1 text-2xl ${movimentacao.tipo === 'R' ? 'text-success-foreground' : 'text-destructive-foreground'} `}
                    ></i>

                    <div
                        className={`absolute inset-0 z-0 w-full opacity-70 dark:opacity-20 ${movimentacao.tipo === 'R' ? 'bg-success' : 'bg-destructive'}`}
                    ></div>
                </div>
                <div className="flex w-full flex-col">
                    <div className="flex flex-row items-center justify-between gap-2">
                        <div className="line-clamp-1 w-full overflow-hidden text-start text-base text-ellipsis text-foreground">
                            {movimentacao.descricao}
                        </div>
                        <div
                            className={`w-fit shrink-0 text-end text-sm ${movimentacao.tipo === 'R' ? 'text-success-foreground' : 'text-destructive-foreground'} `}
                        >
                            {movimentacao.tipo === 'R' ? '' : '-'}
                            {numberToCurrency(movimentacao.valor)}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-start text-sm text-muted">
                            {movimentacao.categoria.nome}
                        </div>
                        {withBank && (
                            <>
                                <Separator
                                    orientation="vertical"
                                    className="h-4"
                                />
                                <div className="truncate text-start text-sm text-muted">
                                    {movimentacao.conta_bancaria
                                        ? movimentacao.conta_bancaria?.banco
                                              .abreviacao
                                        : '---'}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.button>
    );
}
