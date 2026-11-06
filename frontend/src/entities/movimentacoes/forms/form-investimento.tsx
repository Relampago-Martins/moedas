import { useStepper } from '@/entities/stepper/ui/stepper';
import { DialogOrDrawerHeader } from '../../../features/modal-novo/ui/step-header';

export function FormInvestimento() {
    // Aberto pela dock, o passo é a raiz e não tem para onde voltar.
    const { previous, hasPrevious } = useStepper();

    return (
        <>
            <DialogOrDrawerHeader
                title={'Criar investimento'}
                withBackButton={hasPrevious}
                onBack={previous}
            />
            <form></form>;
        </>
    );
}
