'use client';
import { DialogOrDrawer } from '@/shared/ui/custom/dialog-drawer';
import { useCallback } from 'react';
import { useModalNovoStore } from '../lib/modal-novo-store';
import { DialogOrDrawerHeader } from './step-header';
import { Stepper, StepperContent } from './stepper';
import { FormDespesa } from './steps/form-despesa';
import { FormInvestimento } from './steps/form-investimento';
import { FormReceita } from './steps/form-receita';
import { FormTransferencia } from './steps/form-transferencia';
import { MenuMovimentacoes } from './steps/menu-movimentacoes';

export function ModalNovo() {
    const { isOpen, onOpenChange } = useModalNovoStore((state) => state);
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
            <Stepper firstStep={'menu'}>
                <DialogOrDrawerHeader />
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
            </Stepper>
        </DialogOrDrawer>
    );
}
