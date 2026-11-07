'use client';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
    ValueSlider,
    ValueSliderBar,
    ValueSliderIndicators,
    ValueSliderThumb,
    ValueSliderTrack,
} from '@/shared/ui/custom/value-slider';
import { FormField, FormItem, FormMessage } from '@/shared/ui/form';
import type { Control } from 'react-hook-form';
import type { LimiteGastosFormData } from './limite-gastos.schema';

const formatPercent = (value: number) => `${value}%`;

/** Quick picks shown under the slider. */
const ATALHOS = [30, 50, 70];

type LimiteGastosFieldProps = {
    control: Control<LimiteGastosFormData>;
};

/** Slider do percentual da renda reservado para gastos no mês. */
export function LimiteGastosField({ control }: LimiteGastosFieldProps) {
    return (
        <FormField
            control={control}
            name="limite_gastos"
            render={({ field }) => {
                const change = (value: number) =>
                    field.onChange(Math.min(Math.max(value, 0), 100));

                return (
                    <FormItem className="gap-5">
                        <div className="flex flex-col items-center gap-1 rounded-xl bg-muted/40 py-5 text-center">
                            <span className="text-5xl font-semibold tracking-tight tabular-nums">
                                {formatPercent(field.value)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                da sua renda pode virar gasto no mês
                            </span>
                        </div>

                        <div className="flex items-start gap-2 pt-7">
                            <StepButton
                                label="Diminuir limite"
                                icon="ph-minus"
                                disabled={field.value <= 0}
                                onClick={() => change(field.value - 1)}
                            />
                            <ValueSlider
                                value={field.value}
                                onChange={change}
                                onCommit={field.onBlur}
                                formatValue={formatPercent}
                                // arrastar o slider não pode arrastar a drawer junto
                                data-vaul-no-drag
                            >
                                <ValueSliderBar>
                                    <ValueSliderTrack segments={20} />
                                    <ValueSliderThumb aria-label="Limite de gastos" />
                                </ValueSliderBar>
                                <ValueSliderIndicators />
                            </ValueSlider>
                            <StepButton
                                label="Aumentar limite"
                                icon="ph-plus"
                                disabled={field.value >= 100}
                                onClick={() => change(field.value + 1)}
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {ATALHOS.map((atalho) => (
                                <button
                                    key={atalho}
                                    type="button"
                                    onClick={() => change(atalho)}
                                    className={cn(
                                        'rounded-full border px-3 py-1 text-sm transition-colors',
                                        field.value === atalho
                                            ? 'border-primary bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                                    )}
                                >
                                    {formatPercent(atalho)}
                                </button>
                            ))}
                        </div>

                        <p className="text-center text-sm text-muted-foreground">
                            Os outros{' '}
                            <strong className="font-medium text-foreground">
                                {formatPercent(100 - field.value)}
                            </strong>{' '}
                            ficam para investir, guardar ou pagar dívidas.
                        </p>

                        <FormMessage className="text-center" />
                    </FormItem>
                );
            }}
        />
    );
}

function StepButton({
    label,
    icon,
    ...props
}: React.ComponentProps<typeof Button> & { label: string; icon: string }) {
    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            aria-label={label}
            {...props}
        >
            <i className={cn('ph text-lg', icon)} />
        </Button>
    );
}
