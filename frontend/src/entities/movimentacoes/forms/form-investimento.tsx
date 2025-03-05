import { DialogOrDrawerHeader } from '../../../features/modal-novo/ui/step-header';
import {
    StepObject,
    useStepper,
} from '../../../features/modal-novo/ui/stepper';

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
