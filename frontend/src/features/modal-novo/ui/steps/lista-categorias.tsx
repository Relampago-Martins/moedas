import { ModalNovoSteps } from '..';
import { DialogOrDrawerHeader } from '../step-header';
import { useStepper } from '../stepper';

export function ListaCategorias() {
    const { goToStep } = useStepper<ModalNovoSteps>();

    return (
        <>
            <DialogOrDrawerHeader
                title={'Categorias'}
                onBack={() => goToStep({ name: 'gasto', level: 1 })}
            />
        </>
    );
}
