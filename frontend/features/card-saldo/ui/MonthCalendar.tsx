'use client';
import { Button } from '@/shared/ui/button';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

type MonthCalendarProps = {
    children?: React.ReactNode;
};
function MonthCalendar({ children }: MonthCalendarProps) {
    return <div className="flex flex-col gap-4">{children}</div>;
}

type CalendarContentProps = {
    children?: React.ReactNode;
};
function CalendarContent({ children }: CalendarContentProps) {
    return (
        <div className="flex flex-row flex-wrap justify-center gap-2">
            {children}
        </div>
    );
}

type CalendarHeaderProps = {
    year: number;
    setYear: (year: number) => void;
};
function CalendarHeader({ year, setYear }: CalendarHeaderProps) {
    return (
        <div className="flex flex-row items-center justify-center gap-2">
            <Button
                variant={'ghost'}
                size={'sm'}
                onClick={() => setYear(year - 1)}
            >
                <BsChevronLeft />
            </Button>
            <div className="flex w-20 items-center justify-center text-lg font-semibold">
                {year}
            </div>
            <Button
                variant={'ghost'}
                size={'sm'}
                onClick={() => setYear(year + 1)}
            >
                <BsChevronRight />
            </Button>
        </div>
    );
}

type MonthInputProps = {
    value: number;
    children?: React.ReactNode;
    onChange?: (value: number) => void;
    selected?: boolean;
};
function MonthBtn({ value, children, onChange, selected }: MonthInputProps) {
    const handleClick = () => {
        onChange?.(value);
    };

    return (
        <Button
            variant={'ghost'}
            size={'sm'}
            className={`h-10 w-12 ${selected ? 'bg-primary text-white hover:bg-primary hover:text-white' : ''}`}
            onClick={handleClick}
        >
            {children}
        </Button>
    );
}

export { CalendarContent, CalendarHeader, MonthBtn, MonthCalendar };
