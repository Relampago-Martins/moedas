import { Card } from '@/shared/ui/card';
import {
    ArrowDataTransferHorizontalIcon,
    MoneySend01Icon,
} from '@/shared/ui/huge-icons';
import { GastoIcon } from '@/shared/ui/huge-icons/gasto';
import { ReceitaIcon } from '@/shared/ui/huge-icons/receita';
import { useContext } from 'react';
import { ModalCadastroContext } from '../../lib/context';
import { StepHeader } from '../step-header';

const cardClass =
    'flex h-[5.5rem] w-full gap-1 cursor-pointer flex-col items-center justify-center transition-transform duration-300 hover:scale-105';

export function MenuMovimentacoes() {
    const { setStep } = useContext(ModalCadastroContext);
    return (
        <>
            <StepHeader title="Cadastre uma nova movimentação" />
            <div className="grid w-full grid-cols-2 gap-4">
                <Card
                    onClick={() => setStep('gasto')}
                    className={`${cardClass} `}
                >
                    <GastoIcon className="h-8 w-8 text-red-600" />
                    <span className="text-base font-medium">Despesa</span>
                </Card>
                <Card
                    onClick={() => setStep('receita')}
                    className={`${cardClass}`}
                >
                    <ReceitaIcon className="h-8 w-8 text-green-600" />
                    <span className="text-base font-medium">Receita</span>
                </Card>
                <Card
                    onClick={() => setStep('transferencia')}
                    className={`${cardClass}`}
                >
                    <ArrowDataTransferHorizontalIcon className="h-8 w-8 text-blue-600" />
                    <span className="text-base font-medium">Transferência</span>
                </Card>
                <Card
                    onClick={() => setStep('investimento')}
                    className={`${cardClass}`}
                >
                    <MoneySend01Icon className="h-8 w-8 text-purple-600" />
                    <span className="text-base font-medium">Investimento</span>
                </Card>
            </div>
        </>
    );
}
