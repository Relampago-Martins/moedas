import { getDateFromISO } from '@/shared/lib/utils';
import { TFiltroPeriodo } from '@/types/filters';
import { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { formatDate, getMonthRange } from '../../lib/utils';

type DatePickerProps = {
    formControl: Control<TFiltroPeriodo>;
    className?: string;
};

type PeriodoState = {
    before: Date;
    after: Date;
};

/**
 * TODO: separar este componente em MonthPicker e MonthPickerField
 */
export function MonthPicker({ formControl, className }: DatePickerProps) {
    const afterField = useController({
        control: formControl,
        name: 'periodo_after',
    });
    const beforeField = useController({
        control: formControl,
        name: 'periodo_before',
    });
    const [periodo, setPeriodo] = useState<PeriodoState>(
        !!beforeField.field.value && !!afterField.field.value
            ? {
                  before: getDateFromISO(beforeField.field.value),
                  after: getDateFromISO(afterField.field.value),
              }
            : getMonthRange(new Date()),
    );
    const { month, year } = formatDate(periodo.after);
    return (
        <div
            className={`flex h-14 w-full items-center justify-between ${className}`}
        >
            <button
                onClick={() => {
                    const after = new Date(
                        periodo.after.getFullYear(),
                        periodo.after.getMonth() - 1,
                        1,
                    );
                    const before = new Date(
                        periodo.before.getFullYear(),
                        periodo.before.getMonth(),
                        0,
                    );
                    beforeField.field.onChange(
                        before.toISOString().split('T')[0],
                    );
                    afterField.field.onChange(
                        after.toISOString().split('T')[0],
                    );
                    setPeriodo({ before, after });
                }}
            >
                <i className="ph ph-caret-left ml-2 text-xl"></i>
            </button>
            <div className="flex flex-col items-center justify-center">
                <span className="text-sm opacity-80">{year}</span>
                <span className="text-lg font-medium">{month}</span>
            </div>
            <button
                onClick={() => {
                    const after = new Date(
                        periodo.after.getFullYear(),
                        periodo.after.getMonth() + 1,
                        1,
                    );
                    const before = new Date(
                        periodo.before.getFullYear(),
                        periodo.before.getMonth() + 2,
                        0,
                    );
                    beforeField.field.onChange(
                        before.toISOString().split('T')[0],
                    );
                    afterField.field.onChange(
                        after.toISOString().split('T')[0],
                    );
                    setPeriodo({ before, after });
                }}
            >
                <i className="ph ph-caret-right mr-2 text-xl"></i>
            </button>
        </div>
    );
}
