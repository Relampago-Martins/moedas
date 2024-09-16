'use client';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { useRouter } from 'next/navigation';
import { useModalNovoStore } from '../lib/modal-novo-store';
import { SliderAnimation } from './slider-animation';
import { FormDespesa } from './steps/form-despesa';
import { FormInvestimento } from './steps/form-investimento';
import { FormReceita } from './steps/form-receita';
import { FormTransferencia } from './steps/form-transferencia';
import { MenuMovimentacoes } from './steps/menu-movimentacoes';

export function ModalNovo() {
    const { isOpen, onOpenChange, step } = useModalNovoStore((state) => state);
    const router = useRouter();
    const onSucess = () => {
        router.refresh();
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(val) => onOpenChange(val)}>
            <DialogContent
                className="overflow-hidden md:max-w-[20rem]"
                withoutClose
            >
                <SliderAnimation step={step}>
                    {step === 'menu' && <MenuMovimentacoes />}
                    {step === 'gasto' && <FormDespesa onSucess={onSucess} />}
                    {step === 'receita' && <FormReceita onSucess={onSucess} />}
                    {step === 'transferencia' && <FormTransferencia />}
                    {step === 'investimento' && <FormInvestimento />}
                </SliderAnimation>
            </DialogContent>
        </Dialog>
    );
}
