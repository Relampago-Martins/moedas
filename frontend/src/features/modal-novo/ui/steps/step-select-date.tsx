'use client';
import { StepperContent, useStepper } from '@/entities/stepper/ui/stepper';
import { Calendar } from '@/shared/ui/calendar';
import { useEffect, useState } from 'react';
import { DialogOrDrawerHeader } from '../step-header';

type StepSelectDateProps = {};

export function StepSelectDate({}: StepSelectDateProps) {
    const { previous, events } = useStepper();
    const [selected, setSelected] = useState<Date | undefined>();

    useEffect(() => {
        events.subscribe('onOpenDateStep', setSelected);
    }, []);
    return (
        <StepperContent value="calendario" level={2} className="md:w-[25rem]">
            <DialogOrDrawerHeader
                title={'Data da Compra'}
                onBack={() => previous()}
            />
            <Calendar
                mode="single"
                selected={selected}
                onSelect={(date) => {
                    if (!date) return;
                    console.log('date', date);
                    setSelected(date);
                    events.submit('onSelectDate', date);
                    previous();
                }}
                className="w-full"
            />
        </StepperContent>
    );
}
