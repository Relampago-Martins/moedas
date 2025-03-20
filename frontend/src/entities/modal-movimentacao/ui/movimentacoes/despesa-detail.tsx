import { CategoriaBadge } from '@/entities/movimentacoes/item-movimentacao/ui/categoria-badge';
import { StepperContent, useStepper } from '@/entities/stepper/ui/stepper';
import { numberToCurrency, toLocalDate } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { TradeDownIcon } from '@/shared/ui/huge-icons/gasto';
import { Despesa } from '@/types/models/despesa';
import { motion } from 'framer-motion';
import { CalendarIcon, CreditCardIcon } from 'lucide-react';
import { DespesaSkeleton } from '../skeletons/despesa';

type DespesaDetailContext = {
    despesa?: Despesa;
};

export function DespesaDetail({ despesa }: DespesaDetailContext) {
    const { goToStep } = useStepper();
    return (
        <StepperContent value="detail" level={0}>
            {!!despesa ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 0.25 } }}
                    className="grid grid-cols-3 gap-x-2 gap-y-6"
                >
                    <div className="col-span-3 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-fit rounded-full bg-destructive p-1">
                                <TradeDownIcon className="h-6 w-6 text-destructive-foreground" />
                            </div>
                            <h2 className="text-xl">{despesa.descricao}</h2>
                        </div>
                        <h2 className="text-xl">
                            {numberToCurrency(despesa.valor)}
                        </h2>
                    </div>
                    <div className="col-span-3">
                        <CategoriaBadge categoria={despesa.categoria} />
                    </div>
                    <div className="col-span-1 flex items-center gap-2">
                        {despesa.pago ? (
                            <div className="flex items-center gap-2 rounded-md bg-success px-2 py-1 text-success-foreground">
                                <i className="ph-bold ph-check text-lg"></i>
                                <span className="">Pago</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 rounded-md bg-destructive px-2 py-1 text-destructive-foreground">
                                <i className="ph-bold ph-x text-lg"></i>
                                <span className="">Não pago</span>
                            </div>
                        )}
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                        <CalendarIcon className="h-6 w-6" />
                        <div className="flex flex-col">
                            <div className="text-sm text-muted">
                                Comprado em
                            </div>
                            <span className="text-base">
                                {toLocalDate(despesa.data)}
                            </span>
                        </div>
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                        <CreditCardIcon className="h-6 w-6" />
                        <div className="flex flex-col">
                            <div className="text-sm text-muted">
                                Forma de pagamento
                            </div>
                            <span className="text-base">
                                {despesa.forma_pagamento.nome}
                            </span>
                        </div>
                    </div>
                    <Button
                        className="col-span-2"
                        variant={'outline'}
                        onClick={() =>
                            goToStep({
                                name: 'editar',
                                level: 1,
                            })
                        }
                    >
                        Editar
                    </Button>
                    <Button
                        className="col-span-1"
                        variant={'destructive'}
                        onClick={() => {
                            goToStep({
                                name: 'excluir',
                                level: 1,
                            });
                        }}
                    >
                        Excluir
                    </Button>
                </motion.div>
            ) : (
                <DespesaSkeleton />
            )}
        </StepperContent>
    );
}
