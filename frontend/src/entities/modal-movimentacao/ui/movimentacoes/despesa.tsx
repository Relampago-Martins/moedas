import { deleteDespesa, getDespesa } from '@/shared/api/endpoints/despesa-cli';
import { numberToCurrency, toLocalDate } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { TradeDownIcon } from '@/shared/ui/huge-icons/gasto';
import { Despesa } from '@/types/models/despesa';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarIcon, CheckCheck, CreditCardIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMovimentacaoContext } from '../../lib/use-movimentacao-context';
import { DespesaSkeleton } from '../skeletons/despesa';

type DespesaDetailContext = {
    id: number;
};

export function DespesaDetail({ id }: DespesaDetailContext) {
    const router = useRouter();
    const { setMovimentacaoSelecionada } = useMovimentacaoContext();
    const [despesa, setDespesa] = useState<Despesa | null>(null);
    useEffect(() => {
        getDespesa(id).then((despesa) => {
            setDespesa(despesa);
        });
    }, [id]);

    return (
        <AnimatePresence mode="wait" initial={false}>
            {!!despesa ? (
                <motion.div
                    key={'despesa-detail'}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-4 overflow-hidden"
                >
                    <>
                        <div className="mb-2 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-fit rounded-full bg-destructive p-1">
                                    <TradeDownIcon className="h-6 w-6 text-destructive-foreground" />
                                </div>
                                <h2 className="text-xl">{despesa.descricao}</h2>
                            </div>
                            <h2 className=" text-xl">
                                {numberToCurrency(despesa.valor)}
                            </h2>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                {despesa.pago ? (
                                    <>
                                        <CheckCheck className="h-6 w-6 text-green-700" />
                                        <span className="text-sm text-muted">
                                            Pago
                                        </span>
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
                                <div className="text-xs text-muted">
                                    Comprado em
                                </div>
                                <span className="text-base">
                                    {toLocalDate(new Date(despesa.data))}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <CreditCardIcon className="h-6 w-6" />
                            <div className="flex flex-col">
                                <div className="text-xs text-muted">
                                    Forma de pagamento
                                </div>
                                <span className="text-base">
                                    {despesa.forma_pagamento.nome}
                                </span>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center justify-end gap-2">
                            <Button
                                variant={'destructive'}
                                onClick={() => {
                                    deleteDespesa(id).then(() => {
                                        setMovimentacaoSelecionada(undefined);
                                        router.refresh();
                                    });
                                }}
                            >
                                Excluir
                            </Button>
                            <Button variant={'outline'} onClick={() => {}}>
                                Editar
                            </Button>
                        </div>
                    </>
                </motion.div>
            ) : (
                <DespesaSkeleton />
            )}
        </AnimatePresence>
    );
}
