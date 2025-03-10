'use client';
import { DialogOrDrawer } from '@/shared/ui/custom/dialog-drawer';
import { useEvent } from '@/shared/ui/custom/use-event';
import { useCallback, useState } from 'react';
import { FormInvestimento } from '../../../entities/movimentacoes/forms/form-investimento';
import { FormTransferencia } from '../../../entities/movimentacoes/forms/form-transferencia';
import { useModalNovoStore } from '../lib/modal-novo-store';
import { StepObject, Stepper, StepperContent } from './stepper';
import { ListaCategorias } from './steps/lista-categorias';
import { StepFormDespesa } from './steps/step-form-despesa';
import { StepFormReceita } from './steps/step-form-receita';
import { StepMenu } from './steps/step-menu';

export type ModalNovoSteps =
    | 'menu'
    | 'gasto'
    | 'receita'
    | 'transferencia'
    | 'investimento'
    | 'lista-categorias';

export function ModalNovo() {
    const { isOpen, onOpenChange } = useModalNovoStore((state) => state);
    const event = useEvent();
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
            onOpenChange={(val) =>
                onOpenChange(val, () => setStep({ name: 'menu', level: 0 }))
            }
            className="overflow-hidden md:w-auto md:min-w-[20rem]"
        >
            <Stepper currentStep={step} onStepChange={setStep}>
                <StepMenu value="menu" level={0} />
                <StepFormDespesa
                    step={{ name: 'gasto', level: 1 }}
                    stepBack={{ name: 'menu', level: 0 }}
                    subscribeEvent={event.subscribe}
                    onSucess={onSucess}
                />
                <StepFormReceita
                    step={{ name: 'receita', level: 1 }}
                    stepBack={{ name: 'menu', level: 0 }}
                    subscribeEvent={event.subscribe}
                    onSucess={onSucess}
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
                    <ListaCategorias
                        onSelect={(categoria) => {
                            event.submit('onSelectCategoria', categoria);
                        }}
                        stepBack={{ name: 'gasto', level: 1 }}
                    />
                </StepperContent>
                <StepperContent
                    value="lista-categorias-receita"
                    level={2}
                    className="md:w-[25rem]"
                >
                    <ListaCategorias
                        tipoCategoria="R"
                        onSelect={(categoria) => {
                            event.submit('onSelectCategoria', categoria);
                        }}
                        stepBack={{ name: 'receita', level: 1 }}
                    />
                </StepperContent>
            </Stepper>
        </DialogOrDrawer>
    );
}
