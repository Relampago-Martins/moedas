import {
    ArrowDataTransferHorizontalIcon,
    MoneySend01Icon,
} from '@/shared/ui/huge-icons';
import { GastoIcon } from '@/shared/ui/huge-icons/gasto';
import { ReceitaIcon } from '@/shared/ui/huge-icons/receita';
import type { ModalNovoSteps } from '../ui';

type OpcaoNovo = {
    step: Extract<
        ModalNovoSteps,
        'gasto' | 'receita' | 'transferencia' | 'investimento'
    >;
    label: string;
    Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
    /** Cor do ícone. */
    className: string;
};

/** O que dá para criar pelo modal Novo: usado no menu e na dock. */
export const OPCOES_NOVO: OpcaoNovo[] = [
    {
        step: 'gasto',
        label: 'Despesa',
        Icon: GastoIcon,
        className: 'text-red-600',
    },
    {
        step: 'receita',
        label: 'Receita',
        Icon: ReceitaIcon,
        className: 'text-green-600',
    },
    {
        step: 'transferencia',
        label: 'Transferência',
        Icon: ArrowDataTransferHorizontalIcon,
        className: 'text-blue-600',
    },
    {
        step: 'investimento',
        label: 'Investimento',
        Icon: MoneySend01Icon,
        className: 'text-purple-600',
    },
];
