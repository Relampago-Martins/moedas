
export type ModalNovoStore = {
    isOpen: boolean;
    onOpenChange: (newState: boolean) => void;
    step: StepName;
    setStep: (newStep: StepName) => void;
};


export type MovimentacaoName = 'gasto' | 'receita' | 'transferencia' | 'investimento';
export type StepName = 'menu' | MovimentacaoName;