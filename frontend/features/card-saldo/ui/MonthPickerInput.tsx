'use client';
import { Button } from '@/shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { mesOptions } from '../lib/selectMes';
import {
    CalendarContent,
    CalendarHeader,
    MonthBtn,
    MonthCalendar,
} from './MonthCalendar';

export function MonthPickerInput() {
    const [monthData, setMonthData] = useState<MonthData>({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
    });
    const [monthDataSelecting, setMonthDataSelecting] = useState<MonthData>({
        year: monthData.year,
        month: monthData.month,
    });

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    size={'sm'}
                    className="h-8 justify-start text-left font-normal"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>
                        {`${
                            mesOptions.find(
                                (option) => option.value === monthData.month,
                            )?.label
                        } ${monthData.year}`}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
                <MonthCalendar>
                    <CalendarHeader
                        year={monthDataSelecting.year}
                        setYear={(year) =>
                            setMonthDataSelecting({
                                year,
                                month:
                                    monthData.year === year
                                        ? monthData.month
                                        : undefined,
                            })
                        }
                    />
                    <CalendarContent>
                        {mesOptions.map((option) => (
                            <MonthBtn
                                key={option.value}
                                value={option.value}
                                selected={
                                    option.value === monthDataSelecting.month
                                }
                                onChange={(value) => {
                                    setMonthData({
                                        year: monthDataSelecting.year,
                                        month: value,
                                    });
                                    setMonthDataSelecting({
                                        year: monthDataSelecting.year,
                                        month: value,
                                    });
                                }}
                            >
                                {option.abrev}
                            </MonthBtn>
                        ))}
                    </CalendarContent>
                </MonthCalendar>
            </PopoverContent>
        </Popover>
    );
}
