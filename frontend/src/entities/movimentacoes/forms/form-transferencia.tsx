import { DialogOrDrawerHeader } from '../../../features/modal-novo/ui/step-header';
import { useStepper } from '../../stepper/ui/stepper';

export function FormTransferencia() {
    // Aberto pela dock, o passo é a raiz e não tem para onde voltar.
    const { previous, hasPrevious } = useStepper();

    return (
        <>
            <DialogOrDrawerHeader
                title={'Criar transferência'}
                withBackButton={hasPrevious}
                onBack={previous}
            />
            <form></form>;
        </>
    );
}
