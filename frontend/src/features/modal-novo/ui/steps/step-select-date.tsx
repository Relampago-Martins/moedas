import { useStepper } from '@/entities/stepper/ui/stepper';
import { Calendar } from '@/shared/ui/calendar';
import { useState } from 'react';
import { DialogOrDrawerHeader } from '../step-header';

type StepSelectDateProps = {
    onSelect?: (categoria: Date) => void;
};

export function StepSelectDate({ onSelect }: StepSelectDateProps) {
    const { previous } = useStepper();
    const [selected, setSelected] = useState<Date | undefined>();
    // getDateFromISO

    return (
        <>
            <DialogOrDrawerHeader
                title={'Categorias'}
                onBack={() => previous()}
            />
            <Calendar
                mode="single"
                selected={selected}
                onSelect={(date) => {
                    if (!date) return;
                    onSelect?.(date);
                    setSelected(date);
                    previous();
                }}
                className="rounded-md border"
            />
        </>
    );
}
