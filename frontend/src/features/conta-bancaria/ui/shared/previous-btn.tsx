'use client';
import { useStepper } from '@/entities/stepper/ui/stepper';

type PreviousBtnProps = {
    onPrevious?: () => void;
};
export function PreviousBtn({ onPrevious: onClick }: PreviousBtnProps) {
    const { previous } = useStepper();
    return (
        <button
            type="button"
            className="flex w-fit items-center justify-start gap-2 text-sm text-muted "
            onClick={() => {
                previous();
                onClick?.();
            }}
        >
            <i className="ph ph-arrow-left flex"></i>
            Voltar
        </button>
    );
}
