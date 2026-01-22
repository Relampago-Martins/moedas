'use client';
import { useEffect, useRef } from 'react';
import styles from './waves.module.scss';

type WaveAnimationProps = {
    ehReceita?: boolean;
    value?: number;
};

export const WavesCup = ({
    value = 1,
    ehReceita = false,
}: WaveAnimationProps) => {
    const waveRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (waveRef.current) {
            // Set the rise value as a CSS variable
            waveRef.current.style.setProperty('--rise-value', value.toString());
        }
    }, [value]);

    return (
        <div
            className={`${styles.cup} border-2`}
            style={{
                backgroundColor: ehReceita
                    ? 'var(--success-foreground)'
                    : 'var(--destructive-foreground)',
                borderColor: ehReceita
                    ? 'var(--success-foreground)'
                    : 'var(--destructive-foreground)',
            }}
        >
            <div ref={waveRef} className={styles.wave} />
            <div className="absolute bottom-4 flex w-full justify-center">
                {ehReceita ? (
                    <i className="ph-bold ph-trend-up  text-3xl text-white"></i>
                ) : (
                    <i className="ph-bold ph-trend-down text-3xl text-white"></i>
                )}
            </div>
        </div>
    );
};
