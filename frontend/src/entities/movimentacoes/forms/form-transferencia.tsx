import { ModalNovoSteps } from '../../../features/modal-novo/ui';
import { DialogOrDrawerHeader } from '../../../features/modal-novo/ui/step-header';
import { useStepper } from '../../../features/modal-novo/ui/stepper';

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
