import type { ModalNovoSteps } from '../ui';

type OpcaoNovo = {
    step: Extract<
        ModalNovoSteps,
        'gasto' | 'receita' | 'transferencia' | 'investimento'
    >;
    label: string;
    /** Classe do ícone do Phosphor. */
    phosphor: string;
    /** Cor do ícone. */
    className: string;
};

/** O que dá para criar pelo modal Novo: usado no menu e na dock. */
export const OPCOES_NOVO: OpcaoNovo[] = [
    {
        step: 'gasto',
        phosphor: 'ph-trend-down',
        label: 'Despesa',
        className: 'text-red-600',
    },
    {
        step: 'receita',
        phosphor: 'ph-trend-up',
        label: 'Receita',
        className: 'text-green-600',
    },
    {
        step: 'transferencia',
        phosphor: 'ph-arrows-left-right',
        label: 'Transferência',
        className: 'text-blue-600',
    },
    {
        step: 'investimento',
        phosphor: 'ph-piggy-bank',
        label: 'Investimento',
        className: 'text-purple-600',
    },
];
