import { FormDespesa } from '@/entities/movimentacoes/forms/form-despesa';
import { useEvent } from '@/shared/ui/custom/use-event';
import { DespesaSchema } from '@/types/models/despesa';
import { useEffect, useState } from 'react';
import { useModalNovoStore } from '../../lib/modal-novo-store';
import { DialogOrDrawerHeader } from '../step-header';
import { StepperContent, useStepper } from '../stepper';

type StepFormDespesaProps = {
    subscribeEvent: ReturnType<typeof useEvent>['subscribe'];
};

export function StepFormDespesa({ subscribeEvent }: StepFormDespesaProps) {
    const { isOpen, onOpenChange } = useModalNovoStore((state) => state);
    const { goToStep } = useStepper();
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<
        string | undefined
    >();

    useEffect(() => {
        subscribeEvent('onSelectCategoria', (categoria) => {
            setCategoriaSelecionada(categoria.sigla);
        });
    }, []);

    return (
        <StepperContent value="gasto" level={1}>
            <DialogOrDrawerHeader
                title={'Nova Despesa'}
                onBack={() => goToStep({ name: 'menu', level: 0 })}
            />
            <FormDespesa
                stepBack={{ name: 'menu', level: 0 }}
                formValues={
                    { categoria: categoriaSelecionada } as DespesaSchema
                }
                onSucess={() => {
                    onOpenChange(false, () =>
                        goToStep({ name: 'menu', level: 0 }),
                    );
                }}
            />
        </StepperContent>
    );
}
