import { TFiltroPeriodo } from '@/types/filters';
import { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { formatDate, getDateFomISO, getMonthRange } from '../../lib/utils';

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
                  before: getDateFomISO(beforeField.field.value),
                  after: getDateFomISO(afterField.field.value),
              }
            : getMonthRange(new Date()),
    );

    return (
        <div
            className={`flex h-10 w-full items-center justify-between ${className}`}
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
                <i className="ph ph-caret-left ml-2"></i>
            </button>
            {formatDate(periodo.before)}
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
                <i className="ph ph-caret-right mr-2"></i>
            </button>
        </div>
    );
}
