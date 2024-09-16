import { AnimatePresence, motion } from 'framer-motion';

type SliderAnimationProps = {
    step: string;
    children: React.ReactNode;
};

const DESLOC = 310;
export function SliderAnimation({ step, children }: SliderAnimationProps) {
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
                    x: step === 'menu' ? -DESLOC : DESLOC,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                    opacity: 0,
                    x: step === 'menu' ? -DESLOC : DESLOC,
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
