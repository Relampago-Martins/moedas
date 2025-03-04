'use client';
import { DialogOrDrawer } from '@/shared/ui/custom/dialog-drawer';
import { EventProvider } from '@/shared/ui/custom/use-event';
import { useCallback, useState } from 'react';
import { useModalNovoStore } from '../lib/modal-novo-store';
import { StepObject, Stepper, StepperContent } from './stepper';
import { FormDespesa } from './steps/form-despesa';
import { FormInvestimento } from './steps/form-investimento';
import { FormReceita } from './steps/form-receita';
import { FormTransferencia } from './steps/form-transferencia';
import { ListaCategorias } from './steps/lista-categorias';
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
        onOpenChange(false, () => setStep({ name: 'menu', level: 0 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DialogOrDrawer
            open={isOpen}
            onOpenChange={(val) =>
                onOpenChange(val, () => setStep({ name: 'menu', level: 0 }))
            }
            className="overflow-hidden md:w-auto md:min-w-[20rem]"
        >
            <Stepper currentStep={step} onStepChange={setStep}>
                <EventProvider>
                    <StepperContent value="menu" level={0}>
                        <MenuMovimentacoes />
                    </StepperContent>
                    <StepperContent value="gasto" level={1}>
                        <FormDespesa
                            stepBack={{ name: 'menu', level: 0 }}
                            onSucess={onSucess}
                        />
                    </StepperContent>
                    <StepperContent value="receita" level={1}>
                        <FormReceita
                            stepBack={{ name: 'menu', level: 0 }}
                            onSucess={onSucess}
                        />
                    </StepperContent>
                    <StepperContent value="transferencia" level={1}>
                        <FormTransferencia />
                    </StepperContent>
                    <StepperContent value="investimento" level={1}>
                        <FormInvestimento
                            stepBack={{ name: 'menu', level: 0 }}
                        />
                    </StepperContent>
                    <StepperContent
                        value="lista-categorias"
                        level={2}
                        className="md:w-[25rem]"
                    >
                        <ListaCategorias
                            stepBack={{ name: 'gasto', level: 1 }}
                        />
                    </StepperContent>
                </EventProvider>
            </Stepper>
        </DialogOrDrawer>
    );
}
