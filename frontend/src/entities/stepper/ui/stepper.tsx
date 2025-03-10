'use client';
import { StepObject } from '@/entities/stepper/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { StepNavigationTree } from '../lib/step-navigation-tree';

interface TStepperContext<T = string> {
    currentStep: StepObject<T>;
    previousStep: StepObject<T> | null;
    goToStep: (step: StepObject<T>) => void;
    previous: () => void;
}

// Contexto para gerenciar o estado do Stepper
const StepperContext = createContext<TStepperContext<any> | undefined>(
    undefined,
);

// Hook para acessar o contexto
function useStepper<T extends string>() {
    const context = useContext(StepperContext);
    if (!context) {
        throw new Error(
            'useStepperContext deve ser usado dentro de um Stepper',
        );
    }
    return context as unknown as TStepperContext<T>;
}

// SliderAnimation modificado para usar level em vez de firstStep
const DESLOC = 310;

interface SliderAnimationProps {
    children: React.ReactNode;
    step: string;
    level: number;
    className?: string;
}

type Direction = 'left' | 'right';
function SliderAnimation({
    step,
    children,
    level,
    className,
}: SliderAnimationProps) {
    const { currentStep, previousStep } = useStepper<string>();
    const [showStep, setShowStep] = useState(currentStep?.name === step);
    // Determina a direção com base na comparação de níveis
    let initFrom: Direction =
        (previousStep?.level || 0) > level ? 'left' : 'right';
    let exitTo: Direction =
        (previousStep?.level || 0) < level ? 'right' : 'left';

    if (previousStep?.name == step && currentStep?.level < level) {
        exitTo = 'right';
    }

    useEffect(() => {
        setTimeout(() => {
            setShowStep(currentStep.name === step);
        }, 0.5);
    }, [currentStep, step]);

    return (
        <AnimatePresence mode="popLayout" initial={false}>
            {showStep && (
                <motion.div
                    className={className}
                    key={step}
                    transition={{
                        type: 'spring',
                        duration: 0.4,
                        bounce: 0,
                    }}
                    initial={{
                        opacity: 0,
                        x: initFrom === 'left' ? -DESLOC : DESLOC,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    exit={{
                        opacity: 0,
                        x: exitTo === 'left' ? -DESLOC : DESLOC,
                    }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Componente principal Stepper
interface StepperProps<T extends string> {
    defaultValue: StepObject<T>;
    children: React.ReactNode;
}

function Stepper<T extends string>(props: StepperProps<T>) {
    const [currentStep, setCurrentStep] = useState<StepObject<T>>(
        props.defaultValue,
    );
    const [previousStep, setPreviousStep] = useState<StepObject<T> | null>(
        null,
    );
    const navigationTreeRef = useMemo(() => {
        return new StepNavigationTree<T>(props.defaultValue);
    }, []);

    // Função para navegar entre os passos
    const goToStep = (step: StepObject<T>) => {
        setPreviousStep(currentStep);
        navigationTreeRef.navigateTo(step);
        setCurrentStep(step);
    };

    // Função para voltar ao passo anterior na árvore
    const goToPrevious = () => {
        const success = navigationTreeRef.navigateBack();

        if (success) {
            const parentStep = navigationTreeRef.getCurrentStep();
            setPreviousStep(currentStep);
            setCurrentStep(parentStep);
            return true;
        }

        return false;
    };

    const contextValue: TStepperContext<T> = {
        currentStep: currentStep,
        previousStep: previousStep,
        goToStep,
        previous: () => goToPrevious(),
    };

    return (
        <StepperContext.Provider value={contextValue}>
            {props.children}
        </StepperContext.Provider>
    );
}

// Componente para o conteúdo de cada passo
type StepperContentProps = {
    value: string;
    level: number;
    children: React.ReactNode;
    className?: string;
};

function StepperContent({
    value,
    level,
    children,
    className,
}: StepperContentProps) {
    return (
        <SliderAnimation step={value} level={level} className={className}>
            {children}
        </SliderAnimation>
    );
}

export { Stepper, StepperContent, useStepper };
