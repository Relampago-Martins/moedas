'use client';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { Drawer, DrawerContent } from '@/shared/ui/drawer';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useModalNovoStore } from '../lib/modal-novo-store';
import { SliderAnimation } from './slider-animation';
import { FormDespesa } from './steps/form-despesa';
import { FormInvestimento } from './steps/form-investimento';
import { FormReceita } from './steps/form-receita';
import { FormTransferencia } from './steps/form-transferencia';
import { MenuMovimentacoes } from './steps/menu-movimentacoes';

export function ModalNovo() {
    const { isOpen, onOpenChange, step } = useModalNovoStore((state) => state);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const router = useRouter();
    const onSucess = useCallback(() => {
        router.refresh();
        onOpenChange(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Content = (
        <SliderAnimation step={step}>
            {step === 'menu' && <MenuMovimentacoes />}
            {step === 'gasto' && <FormDespesa onSucess={onSucess} />}
            {step === 'receita' && <FormReceita onSucess={onSucess} />}
            {step === 'transferencia' && <FormTransferencia />}
            {step === 'investimento' && <FormInvestimento />}
        </SliderAnimation>
    );

    return isTabletOrMobile ? (
        <Drawer open={isOpen} onOpenChange={onOpenChange} dismissible={false}>
            <DrawerContent>{Content}</DrawerContent>
        </Drawer>
    ) : (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                className="overflow-hidden md:max-w-[20rem]"
                withoutClose
            >
                {Content}
            </DialogContent>
        </Dialog>
    );
}
