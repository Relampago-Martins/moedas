import { AnimatePresence, motion } from 'framer-motion';
import React, { createContext, useContext, useState } from 'react';
import { StepName } from '../lib/types';

interface TStepperContext {
    currentStep: StepName;
    currentLevel: number;
    previousLevel: number | null;
    goToStep: (step: StepName, level: number) => void;
}

// Contexto para gerenciar o estado do Stepper
const StepperContext = createContext<TStepperContext | undefined>(undefined);

// Hook para acessar o contexto
const useStepper = () => {
    const context = useContext(StepperContext);
    if (!context) {
        throw new Error(
            'useStepperContext deve ser usado dentro de um Stepper',
        );
    }
    return context;
};

// SliderAnimation modificado para usar level em vez de firstStep
const DESLOC = 310;

type SliderAnimationProps = {
    children: React.ReactNode;
    step: StepName;
    level: number;
};

function SliderAnimation({ step, children, level }: SliderAnimationProps) {
    const { currentStep, previousLevel, currentLevel } = useStepper();

    // Determina a direção com base na comparação de níveis
    const isMovingForward = level > (previousLevel || 0);
    const isMovingBackward = level <= (previousLevel || 0);

    return (
        <AnimatePresence mode="popLayout" initial={false}>
            {currentStep === step && (
                <motion.div
                    key={step}
                    transition={{
                        type: 'spring',
                        duration: 0.4,
                        bounce: 0,
                    }}
                    initial={{
                        opacity: 0,
                        x: isMovingForward ? DESLOC : -DESLOC,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    exit={{
                        opacity: 0,
                        x: isMovingBackward ? -DESLOC : DESLOC,
                    }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Componente principal Stepper
type StepperProps = {
    firstStep: StepName;
    children?: React.ReactNode;
};

function Stepper({ firstStep, children }: StepperProps) {
    const [currentStep, setCurrentStep] = useState<StepName>(firstStep);
    const [currentLevel, setCurrentLevel] = useState<number>(0);
    const [previousLevel, setPreviousLevel] = useState<number | null>(null);

    // Função para navegar entre os passos
    const goToStep = (step: StepName, level: number) => {
        setPreviousLevel(currentLevel);
        setCurrentLevel(level);
        setCurrentStep(step);
    };

    const contextValue: TStepperContext = {
        currentStep,
        currentLevel,
        previousLevel,
        goToStep,
    };

    return (
        <StepperContext.Provider value={contextValue}>
            {children}
        </StepperContext.Provider>
    );
}

// Componente para o conteúdo de cada passo
type StepperContentProps = {
    value: StepName;
    level: number;
    children: React.ReactNode;
};

function StepperContent({ value, level, children }: StepperContentProps) {
    const { currentStep } = useStepper();

    return (
        <SliderAnimation step={value} level={level}>
            {children}
        </SliderAnimation>
    );
}

export { Stepper, StepperContent, useStepper };
