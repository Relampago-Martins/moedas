'use client';
import { DialogDrawer } from '@/shared/ui/custom/dialog-drawer';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { SliderAnimation } from '../../../shared/ui/custom/slider-animation';
import { useModalNovoStore } from '../lib/modal-novo-store';
import { StepHeader } from './step-header';
import { FormDespesa } from './steps/form-despesa';
import { FormInvestimento } from './steps/form-investimento';
import { FormReceita } from './steps/form-receita';
import { FormTransferencia } from './steps/form-transferencia';
import { MenuMovimentacoes } from './steps/menu-movimentacoes';

export function ModalNovo() {
    const { isOpen, onOpenChange, step } = useModalNovoStore((state) => state);
    const router = useRouter();
    const onSucess = useCallback(() => {
        router.refresh();
        onOpenChange(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DialogDrawer
            open={isOpen}
            onOpenChange={onOpenChange}
            className="overflow-hidden md:max-w-[20rem]"
        >
            <SliderAnimation step={step} firstStep={'menu'}>
                <StepHeader
                    title={getTituloStep(step)}
                    backBtn={step !== 'menu'}
                />
                {step === 'menu' && <MenuMovimentacoes />}
                {step === 'gasto' && <FormDespesa onSucess={onSucess} />}
                {step === 'receita' && <FormReceita onSucess={onSucess} />}
                {step === 'transferencia' && <FormTransferencia />}
                {step === 'investimento' && <FormInvestimento />}
            </SliderAnimation>
        </DialogDrawer>
    );
}

function getTituloStep(step: string) {
    switch (step) {
        case 'menu':
            return 'Criar movimentação';
        case 'gasto':
            return 'Criar despesa';
        case 'receita':
            return 'Criar receita';
        case 'transferencia':
            return 'Criar transferência';
        case 'investimento':
            return 'Criar investimento';
        default:
            return '';
    }
}
