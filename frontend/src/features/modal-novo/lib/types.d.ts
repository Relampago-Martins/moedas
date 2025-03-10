import { StepObject } from "@/entities/stepper/lib/types";

export type ModalNovoStore = {
    isOpen: boolean;
    onOpenChange: (newState: boolean, afterModalClose?: () => void) => void;
    defaultStep: StepObject;
    setDefaultStep: (step: StepObject) => void;
};


export type MovimentacaoName = 'gasto' | 'receita' | 'transferencia' | 'investimento';
export type StepName = 'menu' | MovimentacaoName | 'lista-categorias';