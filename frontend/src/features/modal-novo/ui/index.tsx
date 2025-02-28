'use client';
import { DialogOrDrawer } from '@/shared/ui/custom/dialog-drawer';
import { useCallback, useState } from 'react';
import { useModalNovoStore } from '../lib/modal-novo-store';
import { DialogOrDrawerHeader } from './step-header';
import { StepObject, Stepper, StepperContent } from './stepper';
import { FormDespesa } from './steps/form-despesa';
import { FormInvestimento } from './steps/form-investimento';
import { FormReceita } from './steps/form-receita';
import { FormTransferencia } from './steps/form-transferencia';
import { MenuMovimentacoes } from './steps/menu-movimentacoes';

export type ModalNovoSteps =
    | 'menu'
    | 'gasto'
    | 'receita'
    | 'transferencia'
    | 'investimento'
    | 'lista-categorias';

export function ModalNovo() {
    const { isOpen, onOpenChange } = useModalNovoStore((state) => state);
    const [step, setStep] = useState<StepObject<ModalNovoSteps>>({
        name: 'menu',
        level: 0,
    });
    const onSucess = useCallback(() => {
        onOpenChange(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DialogOrDrawer
            open={isOpen}
            onOpenChange={onOpenChange}
            className="overflow-hidden md:max-w-[20rem]"
        >
            <Stepper currentStep={step} onStepChange={setStep}>
                <DialogOrDrawerHeader
                    title={getTituloStep(step.name)}
                    onBack={() => setStep({ name: 'menu', level: 0 })}
                    withBackButton={step.name !== 'menu'}
                />
                <StepperContent value="menu" level={0}>
                    <MenuMovimentacoes />
                </StepperContent>
                <StepperContent value="gasto" level={1}>
                    <FormDespesa onSucess={onSucess} />
                </StepperContent>
                <StepperContent value="receita" level={1}>
                    <FormReceita onSucess={onSucess} />
                </StepperContent>
                <StepperContent value="transferencia" level={1}>
                    <FormTransferencia />
                </StepperContent>
                <StepperContent value="investimento" level={1}>
                    <FormInvestimento />
                </StepperContent>
                <StepperContent value="lista-categorias" level={2}>
                    <div>Categorias</div>
                </StepperContent>
            </Stepper>
        </DialogOrDrawer>
    );
}

function getTituloStep(step: ModalNovoSteps) {
    switch (step) {
        case 'menu':
            return 'Criar movimentação';
        case 'gasto':
            return 'Criar despesa';
        case 'receita':
            return 'Criar receita';
        case 'transferencia':
            return 'Criar transferência';
        case 'investimento':
            return 'Criar investimento';
        case 'lista-categorias':
            return 'Categorias';
        default:
            return '';
    }
}
