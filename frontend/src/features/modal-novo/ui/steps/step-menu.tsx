import { Card } from '@/shared/ui/card';
import { ModalNovoSteps } from '..';
import {
    StepperContent,
    useStepper,
} from '../../../../entities/stepper/ui/stepper';
import { OPCOES_NOVO } from '../../lib/opcoes-novo';
import { DialogOrDrawerHeader } from '../step-header';

const cardClass =
    'flex h-22 w-full gap-1 cursor-pointer flex-col items-center justify-center transition-transform duration-300 hover:scale-105';

export function StepMenu({ value, level }: { value: string; level: number }) {
    const { goToStep } = useStepper<ModalNovoSteps>();
    return (
        <StepperContent value={value} level={level}>
            <DialogOrDrawerHeader
                title={'Criar movimentação'}
                withBackButton={false}
            />
            <div className="grid w-full grid-cols-2 gap-4">
                {OPCOES_NOVO.map(({ step, label, Icon, className }) => (
                    <Card
                        key={step}
                        onClick={() => goToStep({ name: step, level: 1 })}
                        className={cardClass}
                    >
                        <Icon className={`h-8 w-8 ${className}`} />
                        <span className="text-base font-medium">{label}</span>
                    </Card>
                ))}
            </div>
        </StepperContent>
    );
}
