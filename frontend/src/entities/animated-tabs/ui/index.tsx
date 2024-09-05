'use client';
import { cn } from '@/shared/lib/utils';
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
                        className={cn(
                            'relative cursor-pointer px-4 py-2',
                            activeTab === tab
                                ? 'text-gray-800'
                                : 'text-gray-700',
                        )}
                        onFocus={() => setActiveTab(tab)}
                        onMouseOver={() => setActiveTab(tab)}
                        onMouseLeave={() => setActiveTab(tab)}
                    >
                        {activeTab === tab && (
                            <motion.div
                                layoutId="tab-indicator"
                                className="absolute inset-0 rounded-lg bg-black/5"
                            />
                        )}
                        {tab}
                    </motion.li>
                ))}
            </motion.ul>
        </MotionConfig>
    );
}
