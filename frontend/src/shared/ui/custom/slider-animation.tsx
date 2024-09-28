import { AnimatePresence, motion } from 'framer-motion';

type SliderAnimationProps = {
    children: React.ReactNode;
    step: string;
    firstStep: string;
};

const DESLOC = 310;
export function SliderAnimation({
    step,
    children,
    firstStep,
}: SliderAnimationProps) {
    return (
        <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
                key={step}
                transition={{
                    type: 'spring',
                    duration: 0.4,
                    bounce: 0,
                }}
                initial={{
                    opacity: 0,
                    x: step === firstStep ? -DESLOC : DESLOC,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                    opacity: 0,
                    x: step === firstStep ? -DESLOC : DESLOC,
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
