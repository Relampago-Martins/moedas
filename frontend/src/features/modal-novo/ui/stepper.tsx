import { AnimatePresence, motion } from 'framer-motion';
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';

export interface StepObject<T> {
    name: T;
    level: number;
}

interface TStepperContext<T = string> {
    currentStep: StepObject<T>;
    previousStep: StepObject<T> | null;
    goToStep: (step: StepObject<T>) => void;
}

// Contexto para gerenciar o estado do Stepper
const StepperContext = createContext<TStepperContext | undefined>(undefined);

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
}

function SliderAnimation({ step, children, level }: SliderAnimationProps) {
    const { currentStep, previousStep } = useStepper<string>();
    // Determina a direção com base na comparação de níveis
    const isRight = level > (previousStep?.level || 0);

    return (
        <AnimatePresence mode="popLayout" initial={false}>
            {currentStep.name === step && (
                <motion.div
                    key={step}
                    transition={{
                        type: 'spring',
                        duration: 0.4,
                        bounce: 0,
                    }}
                    initial={{
                        opacity: 0,
                        x: isRight ? DESLOC : -DESLOC,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    exit={{
                        opacity: 0,
                        x: isRight ? DESLOC : -DESLOC,
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
    currentStep: StepObject<T>;
    onStepChange: Dispatch<SetStateAction<StepObject<T>>>;
    children: React.ReactNode;
}

function Stepper<T extends string>(props: StepperProps<T>) {
    const [currentStep, setCurrentStep] = useState<StepObject<T>>(
        props.currentStep,
    );
    const [previousStep, setPreviousStep] = useState<StepObject<string> | null>(
        null,
    );

    useEffect(() => {
        setCurrentStep(props.currentStep);
    }, [props.currentStep]);

    // Função para navegar entre os passos
    const goToStep = (step: StepObject<string>) => {
        setPreviousStep(currentStep);
        props.onStepChange(step as StepObject<T>);
    };

    const contextValue: TStepperContext = {
        currentStep: currentStep,
        previousStep: previousStep,
        goToStep,
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
};

function StepperContent({ value, level, children }: StepperContentProps) {
    return (
        <SliderAnimation step={value} level={level}>
            {children}
        </SliderAnimation>
    );
}

export { Stepper, StepperContent, useStepper };
