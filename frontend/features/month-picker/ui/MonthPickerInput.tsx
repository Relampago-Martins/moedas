'use client';
import { Button } from '@/shared/ui/button';
import {
    CalendarContent,
    CalendarHeader,
    MonthBtn,
    MonthCalendar,
} from '@/shared/ui/custom/MonthCalendar';
import {
    Overlay,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/shared/ui/popover';
import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { mesOptions } from '../lib/selectMes';

export function MonthPickerInput() {
    const [monthData, setMonthData] = useState<MonthData>({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
    });
    const [monthDataSelecting, setMonthDataSelecting] = useState<MonthData>({
        year: monthData.year,
        month: monthData.month,
    });
    const [popoverOpen, setPopoverOpen] = useState(false);

    return (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen} modal={true}>
            {popoverOpen && <Overlay />}
            <PopoverTrigger asChild>
                <Button
                    variant={'ghost'}
                    size={'sm'}
                    className="h-8 justify-start px-0 text-left font-normal hover:bg-inherit"
                >
                    <span>
                        {`${
                            mesOptions.find(
                                (option) => option.value === monthData.month,
                            )?.label
                        } ${monthData.year}`}
                    </span>
                    <BsChevronDown className="ml-2 h-4" />
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
                                month={option.value}
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
                                    setPopoverOpen(false);
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
