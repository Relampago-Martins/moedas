import { ModalNovoSteps } from '..';
import { DialogOrDrawerHeader } from '../step-header';
import { useStepper } from '../stepper';

export function FormTransferencia() {
    const { goToStep } = useStepper<ModalNovoSteps>();

    return (
        <>
            <DialogOrDrawerHeader
                title={'Criar transferência'}
                onBack={() => goToStep({ name: 'menu', level: 0 })}
            />
            <form></form>;
        </>
    );
}
