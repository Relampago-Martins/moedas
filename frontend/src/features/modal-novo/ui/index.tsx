'use client';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ModalCadastroContext } from '../lib/context';
import { useModalNovoStore } from '../lib/modal-novo-store';
import { StepName } from '../lib/types';
import { FormDespesa } from './steps/form-despesa';
import { FormReceita } from './steps/form-receita';
import { MenuMovimentacoes } from './steps/menu-movimentacoes';

const DESLOC = 310;

export function ModalNovo() {
    const { isOpen, onOpenChange } = useModalNovoStore((state) => state);
    const [currentStep, setCurrentStep] = useState<StepName>('menu');

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(val) => {
                onOpenChange(val);
                if (!val)
                    setTimeout(() => {
                        setCurrentStep('menu');
                    }, 300);
            }}
        >
            <DialogContent
                className="overflow-hidden md:max-w-[20rem]"
                withoutClose
            >
                <ModalCadastroContext.Provider
                    value={{ step: currentStep, setStep: setCurrentStep }}
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                            key={currentStep}
                            transition={{
                                type: 'spring',
                                duration: 0.4,
                                bounce: 0,
                            }}
                            initial={{
                                opacity: 0,
                                x: currentStep === 'menu' ? -DESLOC : DESLOC,
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{
                                opacity: 0,
                                x: currentStep === 'menu' ? -DESLOC : DESLOC,
                            }}
                            className="h-full w-full "
                        >
                            {currentStep === 'menu' && <MenuMovimentacoes />}
                            {currentStep === 'gasto' && <FormDespesa />}
                            {currentStep === 'receita' && <FormReceita />}
                            {currentStep === 'transferencia' && (
                                <div>Transferência</div>
                            )}
                            {currentStep === 'investimento' && (
                                <div>Investimento</div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </ModalCadastroContext.Provider>
            </DialogContent>
        </Dialog>
    );
}
