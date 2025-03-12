import { Card } from '@/shared/ui/card';
import {
    ArrowDataTransferHorizontalIcon,
    MoneySend01Icon,
} from '@/shared/ui/huge-icons';
import { GastoIcon } from '@/shared/ui/huge-icons/gasto';
import { ReceitaIcon } from '@/shared/ui/huge-icons/receita';
import { ModalNovoSteps } from '..';
import {
    StepperContent,
    useStepper,
} from '../../../../entities/stepper/ui/stepper';
import { DialogOrDrawerHeader } from '../step-header';

const cardClass =
    'flex h-[5.5rem] w-full gap-1 cursor-pointer flex-col items-center justify-center transition-transform duration-300 hover:scale-105';

export function StepMenu({ value, level }: { value: string; level: number }) {
    const { goToStep } = useStepper<ModalNovoSteps>();
    return (
        <StepperContent value={value} level={level}>
            <DialogOrDrawerHeader
                title={'Criar movimentação'}
                withBackButton={false}
            />
            <div className="grid w-full grid-cols-2 gap-4">
                <Card
                    onClick={() =>
                        goToStep({
                            name: 'gasto',
                            level: 1,
                        })
                    }
                    className={`${cardClass}`}
                >
                    <GastoIcon className="h-8 w-8 text-red-600" />
                    <span className="text-base font-medium">Despesa</span>
                </Card>
                <Card
                    onClick={() =>
                        goToStep({
                            name: 'receita',
                            level: 1,
                        })
                    }
                    className={`${cardClass}`}
                >
                    <ReceitaIcon className="h-8 w-8 text-green-600" />
                    <span className="text-base font-medium">Receita</span>
                </Card>
                <Card
                    onClick={() =>
                        goToStep({
                            name: 'transferencia',
                            level: 1,
                        })
                    }
                    className={`${cardClass}`}
                >
                    <ArrowDataTransferHorizontalIcon className="h-8 w-8 text-blue-600" />
                    <span className="text-base font-medium">Transferência</span>
                </Card>
                <Card
                    onClick={() =>
                        goToStep({
                            name: 'investimento',
                            level: 1,
                        })
                    }
                    className={`${cardClass}`}
                >
                    <MoneySend01Icon className="h-8 w-8 text-purple-600" />
                    <span className="text-base font-medium">Investimento</span>
                </Card>
            </div>
        </StepperContent>
    );
}
