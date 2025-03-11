'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import {
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/shared/ui/collapsible';
import { Carteira } from '@/types/models';
import { Collapsible } from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { GraficoEconomia } from './GraficoEconomia';
import './ui.scss';

type FooterContentProps = {
    carteira: Carteira;
};

export function FooterContent({ carteira }: FooterContentProps) {
    const [open, setOpen] = useState(false);
    const totalEconomizado = carteira.total_receitas - carteira.total_despesas;

    return (
        <Collapsible
            className="flex w-full flex-col gap-2"
            open={open}
            onOpenChange={() => setOpen(!open)}
        >
            <CollapsibleContent className="CollapsibleMotion">
                <div className="flex flex-row items-center justify-center gap-4">
                    <GraficoEconomia carteira={carteira} />
                    <div className="flex flex-col break-words text-center text-xs text-gray-400">
                        <span className="max-w-[11rem]">
                            {`Parabéns! Você economizou 
                            ${numberToCurrency(totalEconomizado)} este mês.`}
                        </span>
                    </div>
                </div>
            </CollapsibleContent>
            <CollapsibleTrigger className="self-center">
                <ChevronDown
                    className={`h-4 w-4 transform transition-transform duration-500
                    ${open ? 'rotate-180' : ''}`}
                />
            </CollapsibleTrigger>
        </Collapsible>
    );
}
