'use client';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Flag01Icon, TradeDownIcon } from '@/shared/ui/huge-icons/gasto';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { date2MesAno, incrementMonth } from '../lib/utils';
import { DinTile } from './din-tile';

type HeaderOrcamentoProps = {
    totalGasto: number;
    totalLimite: number;
};
export function HeaderOrcamento({
    totalGasto,
    totalLimite,
}: HeaderOrcamentoProps) {
    const hoje = new Date();
    const [data, setData] = useState<{ mes: number; ano: number }>({
        mes: hoje.getMonth(),
        ano: hoje.getFullYear(),
    });
    return (
        <Card>
            <div className="flex flex-row items-center justify-between border-b-[1px] px-4 py-0">
                <Button
                    variant={'ghost'}
                    onClick={() =>
                        setData((prev) =>
                            incrementMonth(prev.mes, prev.ano, -1),
                        )
                    }
                >
                    <ChevronLeft className="h-5 w-5 text-muted" />
                </Button>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={`${data.mes}-${data.ano}`}
                        transition={{
                            type: 'spring',
                            duration: 0.2,
                            bounce: 0,
                        }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                    >
                        {date2MesAno(data.mes, data.ano)}
                    </motion.div>
                </AnimatePresence>
                <Button
                    variant={'ghost'}
                    onClick={() =>
                        setData((prev) => incrementMonth(prev.mes, prev.ano, 1))
                    }
                >
                    <ChevronRight className="h-5 w-5 text-muted" />
                </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 px-4 py-1 sm:justify-between sm:gap-4">
                <div className="w-full sm:w-fit">
                    <DinTile label="Restam" valor={totalLimite - totalGasto} />
                </div>
                <DinTile
                    label="Total gasto"
                    valor={totalGasto}
                    icon={
                        <div className="w-fit rounded-full bg-destructive p-1">
                            <TradeDownIcon className="h-6 w-6 text-destructive-foreground" />
                        </div>
                    }
                />
                <DinTile
                    label="Limite de gastos"
                    valor={totalLimite}
                    icon={
                        <div className="w-fit rounded-full bg-border p-1">
                            <Flag01Icon className="h-6 w-6 text-muted" />
                        </div>
                    }
                />
            </div>
        </Card>
    );
}
