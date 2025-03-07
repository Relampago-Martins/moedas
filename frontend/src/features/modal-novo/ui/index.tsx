'use client';
import { DialogOrDrawer } from '@/shared/ui/custom/dialog-drawer';
import { useEvent } from '@/shared/ui/custom/use-event';
import { FormInvestimento } from '../../../entities/movimentacoes/forms/form-investimento';
import { FormTransferencia } from '../../../entities/movimentacoes/forms/form-transferencia';
import { Stepper, StepperContent } from '../../../entities/stepper/ui/stepper';
import { useModalNovoStore } from '../lib/modal-novo-store';
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

    return (
        <DialogOrDrawer
            open={isOpen}
            onOpenChange={onOpenChange}
            className="overflow-hidden md:w-auto md:min-w-[20rem]"
        >
            {isOpen && (
                <Stepper defaultValue={{ name: 'menu', level: 0 }}>
                    <StepMenu value="menu" level={0} />
                    <StepFormDespesa
                        step={{ name: 'gasto', level: 1 }}
                        subscribeEvent={event.subscribe}
                        onSucess={() => onOpenChange(false)}
                    />
                    <StepFormReceita
                        step={{ name: 'receita', level: 1 }}
                        subscribeEvent={event.subscribe}
                        onSucess={() => onOpenChange(false)}
                    />
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
            )}
        </DialogOrDrawer>
    );
}
