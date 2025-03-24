import styles from './flip.module.scss';

type FlipCardProps = {
    front: React.ReactNode;
    back: React.ReactNode;
    className?: string;
};

export function FlipCard({ front, back, className }: FlipCardProps) {
    return (
        <div className={`${styles.flipCard} ${className}`}>
            <div className={styles.flipCardInner}>
                <div
                    className={`${styles.flipCardFront} rounded-md border  px-4 py-2`}
                >
                    {front}
                </div>
                <div
                    className={`${styles.flipCardBack} rounded-md border px-4 py-2`}
                >
                    {back}
                </div>
            </div>
            <div className=""></div>
        </div>
    );
}
