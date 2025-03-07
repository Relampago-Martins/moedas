import { CategoriaBadge } from '@/entities/movimentacoes/item-movimentacao/ui/categoria-badge';
import { StepperContent, useStepper } from '@/entities/stepper/ui/stepper';
import { numberToCurrency, toLocalDate } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { TradeUpIcon } from '@/shared/ui/huge-icons/receita';
import { Receita } from '@/types/models/receita';
import { motion } from 'framer-motion';
import { CalendarIcon } from 'lucide-react';
import { ReceitaSkeleton } from '../skeletons/receita';

type ReceitaDetailContext = {
    receita?: Receita;
};

export function StepReceitaDetail({ receita }: ReceitaDetailContext) {
    const { goToStep } = useStepper();
    return (
        <StepperContent value="detail" level={0}>
            {!!receita ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-4"
                >
                    <div className="mb-2 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-fit rounded-full bg-success p-1">
                                <TradeUpIcon className="h-6 w-6 text-success-foreground" />
                            </div>
                            <h2 className="text-xl">{receita.descricao}</h2>
                        </div>
                        <h2 className="text-xl">
                            {numberToCurrency(receita.valor)}
                        </h2>
                    </div>
                    <CategoriaBadge categoria={receita.categoria} />

                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-6 w-6" />
                        <div className="flex flex-col">
                            <div className="text-xs text-muted">
                                Recebido em
                            </div>
                            <span className="text-base">
                                {toLocalDate(receita.data)}
                            </span>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center justify-end gap-2">
                        <Button
                            variant={'outline'}
                            onClick={() => {
                                goToStep({ name: 'editar', level: 1 });
                            }}
                        >
                            Editar
                        </Button>
                        <Button
                            variant={'destructive'}
                            onClick={() => {
                                goToStep({ name: 'excluir', level: 1 });
                            }}
                        >
                            Excluir
                        </Button>
                    </div>
                </motion.div>
            ) : (
                <ReceitaSkeleton />
            )}
        </StepperContent>
    );
}
