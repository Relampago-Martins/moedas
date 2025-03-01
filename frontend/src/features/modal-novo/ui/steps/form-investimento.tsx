import { ModalNovoSteps } from '..';
import { DialogOrDrawerHeader } from '../step-header';
import { useStepper } from '../stepper';

export function FormInvestimento() {
    const { goToStep } = useStepper<ModalNovoSteps>();

    return (
        <>
            <DialogOrDrawerHeader
                title={'Criar investimento'}
                onBack={() => goToStep({ name: 'menu', level: 0 })}
            />
            <form></form>;
        </>
    );
}
