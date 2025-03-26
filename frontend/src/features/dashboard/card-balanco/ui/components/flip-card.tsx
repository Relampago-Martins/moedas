'use client';
import styles from './flip.module.scss';

type FlipCardProps = {
    front: React.ReactNode;
    back: React.ReactNode;
    className?: string;
};

export function useFlipCard() {
    return {
        flip: () => {
            const flipCard = document.getElementById('flip-card');
            if (flipCard) {
                const isFlipped =
                    flipCard.getAttribute('data-flipped') === 'true';
                flipCard.setAttribute(
                    'data-flipped',
                    isFlipped ? 'false' : 'true',
                );
            }
        },
    };
}

export function FlipCard({ front, back, className }: FlipCardProps) {
    return (
        <div
            id="flip-card"
            className={`${styles.flipCard} ${className}`}
            data-flipped="false"
        >
            <div className={styles.flipCardInner}>
                <div className={`${styles.flipCardFront} rounded-md border`}>
                    {front}
                </div>
                <div className={`${styles.flipCardBack} rounded-md border`}>
                    {back}
                </div>
            </div>
        </div>
    );
}
