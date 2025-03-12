'use client';
import { DialogOrDrawer } from '@/shared/ui/custom/dialog-drawer';
import { FormInvestimento } from '../../../entities/movimentacoes/forms/form-investimento';
import { FormTransferencia } from '../../../entities/movimentacoes/forms/form-transferencia';
import { Stepper, StepperContent } from '../../../entities/stepper/ui/stepper';
import { useModalNovoStore } from '../lib/modal-novo-store';
import { ListaCategorias } from './steps/lista-categorias';
import { StepFormDespesa } from './steps/step-form-despesa';
import { StepFormReceita } from './steps/step-form-receita';
import { StepMenu } from './steps/step-menu';
import { StepSelectDate } from './steps/step-select-date';

export type ModalNovoSteps =
    | 'menu'
    | 'gasto'
    | 'receita'
    | 'transferencia'
    | 'investimento'
    | 'lista-categorias'
    | 'lista-categorias-receita'
    | 'calendario';

/**
 *
 * TODO: Transformar o conteúdo deste componente em um dynamic import (lazy load)
 * para melhorar a performance da aplicação.
 */
export function ModalNovo() {
    const { defaultStep, isOpen, onOpenChange, setDefaultStep } =
        useModalNovoStore((state) => state);

    return (
        <DialogOrDrawer
            open={isOpen}
            onOpenChange={(v) => {
                if (!v) {
                    setDefaultStep({ name: 'menu', level: 0 });
                }
                onOpenChange(v);
            }}
            className="overflow-hidden md:w-auto md:min-w-[20rem]"
        >
            <Stepper defaultValue={defaultStep}>
                <StepMenu value="menu" level={0} />
                <StepFormDespesa
                    step={{ name: 'gasto', level: 1 }}
                    onSucess={() => onOpenChange(false)}
                />
                <StepFormReceita
                    step={{ name: 'receita', level: 1 }}
                    onSucess={() => onOpenChange(false)}
                />
                <StepperContent value="transferencia" level={1}>
                    <FormTransferencia />
                </StepperContent>
                <StepperContent value="investimento" level={1}>
                    <FormInvestimento stepBack={{ name: 'menu', level: 0 }} />
                </StepperContent>
                <StepperContent
                    value="lista-categorias"
                    level={2}
                    className="md:w-[25rem]"
                >
                    <ListaCategorias />
                </StepperContent>
                <StepperContent
                    value="lista-categorias-receita"
                    level={2}
                    className="md:w-[25rem]"
                >
                    <ListaCategorias tipoCategoria="R" />
                </StepperContent>

                <StepSelectDate />
            </Stepper>
        </DialogOrDrawer>
    );
}
