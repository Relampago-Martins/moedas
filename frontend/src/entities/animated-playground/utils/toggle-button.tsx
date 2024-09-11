'use client';
import { Button } from '@/shared/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useState } from 'react';

export function ToggleButton() {
    const [darkTheme, setDarkTheme] = useState(false);

    return (
        <Button
            variant={'outline'}
            className="py-2"
            onClick={() => setDarkTheme(!darkTheme)}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={darkTheme ? 'moon' : 'sun'}
                    transition={{
                        type: 'spring',
                        duration: 0.3,
                        bounce: 0,
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                >
                    {darkTheme ? (
                        <MoonIcon className="h-8" />
                    ) : (
                        <SunIcon className="h-8" />
                    )}
                </motion.div>
            </AnimatePresence>
        </Button>
    );
}
