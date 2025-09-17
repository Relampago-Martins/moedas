'use client';
import { StepObject } from '@/entities/stepper/lib/types';
import { useEvent } from '@/shared/lib/use-event';
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
    hasPrevious: boolean;
    events: ReturnType<typeof useEvent>;
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

interface SliderAnimationProps {
    children: React.ReactNode;
    step: string;
    level: number;
    className?: string;
}

type Direction = 'left' | 'right';
function SliderAnimation({
    step: stepName,
    children,
    level,
    className,
}: SliderAnimationProps) {
    const { currentStep, previousStep } = useStepper<string>();
    const [showStep, setShowStep] = useState(currentStep?.name === stepName);
    // Determina a direção com base na comparação de níveis
    let initFrom: Direction =
        (previousStep?.level || 0) > level ? 'left' : 'right';
    let exitTo: Direction =
        (previousStep?.level || 0) < level ? 'right' : 'left';

    if (previousStep?.name == stepName && currentStep?.level < level) {
        exitTo = 'right';
    }

    useEffect(() => {
        setTimeout(() => {
            setShowStep(currentStep.name === stepName);
        }, 0.5);
    }, [currentStep, stepName]);

    return (
        <AnimatePresence mode="popLayout" initial={false}>
            {showStep && (
                <motion.div
                    className={className}
                    key={stepName}
                    transition={{
                        type: 'spring',
                        duration: 0.4,
                        bounce: 0,
                    }}
                    initial={{
                        opacity: 0,
                        x: initFrom === 'left' ? '-110%' : '110%',
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    exit={{
                        opacity: 0,
                        x: exitTo === 'left' ? '-110%' : '110%',
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
    const events = useEvent();
    const [currentStep, setCurrentStep] = useState<StepObject<T>>(
        props.defaultValue,
    );
    const [previousStep, setPreviousStep] = useState<StepObject<T> | null>(
        null,
    );
    const navigationTree = useMemo(() => {
        return new StepNavigationTree<T>(props.defaultValue);
    }, []);

    // Função para navegar entre os passos
    const goToStep = (step: StepObject<T>) => {
        setPreviousStep(currentStep);
        navigationTree.navigateTo(step);
        setCurrentStep(step);
    };

    // Função para voltar ao passo anterior na árvore
    const goToPrevious = () => {
        const success = navigationTree.navigateBack();

        if (success) {
            const parentStep = navigationTree.getCurrentStep();
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
        events,
        hasPrevious: navigationTree.hasPrevious(),
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
