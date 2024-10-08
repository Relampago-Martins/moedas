'use client';
import { Button } from '@/shared/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex w-20 items-center justify-center text-lg font-semibold">
                {year}
            </div>
            <Button
                variant={'ghost'}
                size={'sm'}
                onClick={() => setYear(year + 1)}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

type MonthInputProps = {
    month: number;
    children?: React.ReactNode;
    onChange?: (value: number) => void;
    selected?: boolean;
};
function MonthBtn({ month, children, onChange, selected }: MonthInputProps) {
    return (
        <button
            className={`h-10 w-12 rounded-sm text-sm ${selected ? 'border border-primary-foreground bg-primary font-medium text-primary-foreground' : 'hover:bg-accent'}`}
            onClick={() => {
                onChange?.(month);
            }}
        >
            {children}
        </button>
    );
}

export { CalendarContent, CalendarHeader, MonthBtn, MonthCalendar };
