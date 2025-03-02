import { DialogOrDrawerHeader } from '../step-header';
import { StepObject, useStepper } from '../stepper';

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
