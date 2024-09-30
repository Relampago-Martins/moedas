import { numberToCurrency, toLocalDate } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { TradeDownIcon } from '@/shared/ui/huge-icons/gasto';
import { Despesa } from '@/types/models/despesa';
import { motion } from 'framer-motion';
import { CalendarIcon, CheckCheck, CreditCardIcon, XIcon } from 'lucide-react';
import { DespesaSkeleton } from '../skeletons/despesa';

type DespesaDetailContext = {
    despesa?: Despesa;
    onEdit: () => void;
    onDelete: () => void;
};

export function DespesaDetail({
    despesa,
    onEdit,
    onDelete,
}: DespesaDetailContext) {
    return !!despesa ? (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.25 } }}
            className="flex flex-col gap-4 "
        >
            <div className="mb-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-fit rounded-full bg-destructive p-1">
                        <TradeDownIcon className="h-6 w-6 text-destructive-foreground" />
                    </div>
                    <h2 className="text-xl">{despesa.descricao}</h2>
                </div>
                <h2 className="text-xl">{numberToCurrency(despesa.valor)}</h2>
            </div>
            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    {despesa.pago ? (
                        <>
                            <CheckCheck className="h-6 w-6 text-green-700" />
                            <span className="text-sm text-muted">Pago</span>
                        </>
                    ) : (
                        <>
                            <XIcon className="h-6 w-6 text-destructive-foreground" />
                            <span className="text-sm text-muted">
                                Não foi pago
                            </span>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="h-6 w-6 rounded-full"
                        style={{
                            backgroundColor: despesa.categoria.cor,
                        }}
                    ></div>
                    <span className="text-sm text-muted">
                        {despesa.categoria.nome}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <CalendarIcon className="h-6 w-6" />
                <div className="flex flex-col">
                    <div className="text-xs text-muted">Comprado em</div>
                    <span className="text-base">
                        {toLocalDate(new Date(despesa.data))}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <CreditCardIcon className="h-6 w-6" />
                <div className="flex flex-col">
                    <div className="text-xs text-muted">Forma de pagamento</div>
                    <span className="text-base">
                        {despesa.forma_pagamento.nome}
                    </span>
                </div>
            </div>
            <div className="mt-2 flex items-center justify-end gap-2">
                <Button variant={'outline'} onClick={onEdit}>
                    Editar
                </Button>
                <Button variant={'destructive'} onClick={onDelete}>
                    Excluir
                </Button>
            </div>
        </motion.div>
    ) : (
        <DespesaSkeleton />
    );
}
