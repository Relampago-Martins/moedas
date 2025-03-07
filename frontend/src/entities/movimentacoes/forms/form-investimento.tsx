import { StepObject } from '@/entities/stepper/lib/types';
import { useStepper } from '@/entities/stepper/ui/stepper';
import { DialogOrDrawerHeader } from '../../../features/modal-novo/ui/step-header';

type FormInvestimentoProps = {
    stepBack: StepObject<string>;
};
export function FormInvestimento({ stepBack }: FormInvestimentoProps) {
    const { goToStep } = useStepper();

    return (
        <>
            <DialogOrDrawerHeader
                title={'Criar investimento'}
                onBack={() => goToStep(stepBack)}
            />
            <form></form>;
        </>
    );
}
