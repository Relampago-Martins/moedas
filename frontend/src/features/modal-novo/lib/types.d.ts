
export type ModalNovoStore = {
    isOpen: boolean;
    onOpenChange: (newState: boolean) => void;
};


export type MovimentacaoName = 'gasto' | 'receita' | 'transferencia' | 'investimento';
export type StepName = 'menu' | MovimentacaoName;