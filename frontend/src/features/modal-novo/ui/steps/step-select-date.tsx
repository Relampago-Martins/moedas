'use client';
import { StepperContent, useStepper } from '@/entities/stepper/ui/stepper';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Separator } from '@/shared/ui/separator';
import { useCallback, useEffect, useState } from 'react';
import { DialogOrDrawerHeader } from '../step-header';

export function StepSelectDate() {
    const { previous, events } = useStepper();
    const [selected, setSelected] = useState<Date | undefined>();

    useEffect(() => {
        events.subscribe('onOpenDateStep', setSelected);
    }, []);

    const selectDate = useCallback(
        (date: Date | undefined) => {
            if (!date) return;
            setSelected(date);
            events.submit('onSelectDate', date);
            previous();
        },
        [events, previous],
    );

    return (
        <StepperContent value="calendario" level={2} className="md:w-fit">
            <DialogOrDrawerHeader
                title={'Data da Compra'}
                onBack={() => previous()}
            />
            <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                    <Button
                        variant={'ghost'}
                        size={'sm'}
                        className="justify-start"
                        onClick={() => {
                            const yesterday = new Date();
                            yesterday.setDate(yesterday.getDate() - 1);
                            selectDate(yesterday);
                        }}
                    >
                        Ontem
                    </Button>
                    <Button
                        variant="ghost"
                        size={'sm'}
                        className="justify-start"
                        onClick={() => selectDate(new Date())}
                    >
                        Hoje
                    </Button>
                    <Button
                        variant="ghost"
                        size={'sm'}
                        className="justify-start"
                        onClick={() => {
                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            selectDate(tomorrow);
                        }}
                    >
                        Amanhã
                    </Button>
                    <Button
                        variant="ghost"
                        className="h-auto justify-start text-nowrap py-1"
                        size={'sm'}
                        onClick={() => {
                            const nextWeek = new Date();
                            nextWeek.setDate(nextWeek.getDate() + 7);
                            selectDate(nextWeek);
                        }}
                    >
                        Próxima Semana
                    </Button>
                    <Button
                        variant="ghost"
                        className="h-auto justify-start text-nowrap py-1"
                        size={'sm'}
                        onClick={() => {
                            const nextMonth = new Date();
                            nextMonth.setMonth(nextMonth.getMonth() + 1);
                            selectDate(nextMonth);
                        }}
                    >
                        Próximo Mês
                    </Button>
                </div>
                <Separator orientation="vertical" className="" />
                <Calendar
                    mode="single"
                    selected={selected}
                    onSelect={selectDate}
                    className="w-[300px]"
                />
            </div>
        </StepperContent>
    );
}
