'use client';
import { motion, MotionConfig } from 'framer-motion';
import { useState } from 'react';

const TABS = ['Despesas', 'Receitas', 'Resumo'];

export function AnimatedTabs() {
    const [activeTab, setActiveTab] = useState(TABS[0]);
    return (
        <MotionConfig
            transition={{
                type: 'spring',
                bounce: 0.23,
            }}
        >
            <motion.ul className="flex gap-6">
                {TABS.map((tab) => (
                    <motion.li
                        key={tab}
                        className="relative cursor-pointer px-4 py-2"
                        onFocus={() => setActiveTab(tab)}
                        onMouseOver={() => setActiveTab(tab)}
                        onMouseLeave={() => setActiveTab(tab)}
                    >
                        <motion.span
                            className={
                                activeTab === tab
                                    ? 'text-foreground'
                                    : 'text-muted-foreground'
                            }
                        >
                            {tab}
                        </motion.span>
                        {activeTab === tab && (
                            <motion.div
                                layoutId="tab-indicator"
                                className="absolute inset-0 rounded-lg bg-black/5 dark:bg-white/5"
                            />
                        )}
                    </motion.li>
                ))}
            </motion.ul>
        </MotionConfig>
    );
}
