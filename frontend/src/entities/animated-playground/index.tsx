'use client';
import { motion } from 'framer-motion';
import { ToggleButton } from './utils/toggle-button';

export function AnimatedPlayground() {
    return (
        <div className="flex gap-8">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.5,
                }}
                className="h-12 w-12 rounded-lg bg-primary"
            ></motion.div>
            <div className="flex flex-col gap-2">
                <ToggleButton />
                <span className="text-xs text-foreground">Toggle button</span>
            </div>
        </div>
    );
}
