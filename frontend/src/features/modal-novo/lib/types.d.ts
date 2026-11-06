import { StepObject } from "@/entities/stepper/lib/types";

export type ModalNovoStore = {
    isOpen: boolean;
    onOpenChange: (newState: boolean, afterModalClose?: () => void) => void;
    defaultStep: StepObject;
    setDefaultStep: (step: StepObject) => void;
    /**
     * `id` do botão de onde o modal saiu, para o morph botão → modal no
     * desktop. Fica guardado depois de fechar, para o modal voltar a ele.
     */
    origemId?: string;
    /** Abre o modal a partir de um botão, opcionalmente já em um passo. */
    abrir: (origemId: string, defaultStep?: StepObject) => void;
};


export type MovimentacaoName = 'gasto' | 'receita' | 'transferencia' | 'investimento';
export type StepName = 'menu' | MovimentacaoName | 'lista-categorias';