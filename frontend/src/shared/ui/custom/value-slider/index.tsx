'use client';

import { cn } from '@/shared/lib/utils';
import { createContext, useContext } from 'react';
import {
    useValueSlider,
    type ValueSliderConfig,
    type ValueSliderState,
} from './use-value-slider';

/*
 * Composition:
 *
 *   <ValueSlider>                  stacks the parts in the order they come
 *       <ValueSliderBar>              the box, and the width reference
 *           <ValueSliderTrack/>           fill and ticks
 *           <ValueSliderThumb/>           handle + tooltip
 *       </ValueSliderBar>
 *       <ValueSliderIndicators/>      scale below the bar
 *   </ValueSlider>
 *
 * The root is just a flex column: reordering children reorders them on screen.
 * The bar is what positions things horizontally, since the hook measures it.
 */

const ValueSliderContext = createContext<ValueSliderState | null>(null);

/** Current slider state, to build custom parts. */
export function useValueSliderState() {
    const state = useContext(ValueSliderContext);
    if (!state) {
        throw new Error('ValueSlider parts must be inside <ValueSlider>');
    }
    return state;
}

type Anchor = 'start' | 'center' | 'end';

/**
 * Places a part horizontally inside the bar's grid cell. The percentage margin
 * resolves against the cell width, which is the bar width the hook measures.
 */
function placeInBar(anchor: Anchor, pct: number) {
    if (anchor === 'start') return { className: 'justify-self-start' };
    if (anchor === 'end') return { className: 'justify-self-end' };
    return {
        className: 'justify-self-start -translate-x-1/2',
        style: { marginLeft: `${pct}%` },
    };
}

type ValueSliderProps = ValueSliderConfig &
    Omit<React.ComponentProps<'div'>, 'onChange'>;

/**
 * Root: owns the interaction state and stacks the parts. Headless about where
 * the value comes from: receives `value`/`onChange` and knows no form.
 */
export function ValueSlider({
    value,
    onChange,
    onCommit,
    min,
    max,
    step,
    disabled,
    formatValue,
    className,
    children,
    ...props
}: ValueSliderProps) {
    const state = useValueSlider({
        value,
        onChange,
        onCommit,
        min,
        max,
        step,
        disabled,
        formatValue,
    });

    return (
        <ValueSliderContext.Provider value={state}>
            <div
                className={cn(
                    'flex w-full flex-col select-none',
                    disabled && 'opacity-50',
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </ValueSliderContext.Provider>
    );
}

/**
 * The bar: listens to the pointer and stacks its children in a single grid
 * cell, in the order they appear.
 */
export function ValueSliderBar({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    const { barRef, onBarPointerDown, disabled } = useValueSliderState();

    return (
        <div
            ref={barRef}
            onPointerDown={onBarPointerDown}
            className={cn(
                'relative grid h-8 w-full touch-none grid-cols-1 grid-rows-1 rounded-xl border bg-card *:col-start-1 *:row-start-1',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

type ValueSliderTrackProps = React.ComponentProps<'div'> & {
    /** How many equal parts the ticks split the bar into. 0 hides them. */
    segments?: number;
    /** Every how many ticks a taller (major) one is drawn. Default: 5. */
    majorEvery?: number;
    /** Classes for the filled part. Default: bg-primary. */
    fillClassName?: string;
};

/**
 * Painted content of the bar: the fill and the ticks. Clips to the bar's
 * rounding, which is why the thumb lives outside it.
 */
export function ValueSliderTrack({
    segments = 20,
    majorEvery = 5,
    fillClassName,
    className,
    ...props
}: ValueSliderTrackProps) {
    const { pct } = useValueSliderState();

    return (
        <div
            className={cn(
                'grid grid-cols-1 grid-rows-1 overflow-hidden rounded-[inherit] *:col-start-1 *:row-start-1',
                className,
            )}
            {...props}
        >
            <div
                className={cn('h-full bg-primary', fillClassName)}
                style={{ width: `${pct}%` }}
            />

            {/*
             * Flex splits the width in equal parts and each part draws the tick
             * on its own right edge; the last part closes on the bar's border,
             * so it has none. Ticks under the fill switch to the fill's
             * foreground so they stay visible.
             */}
            {segments > 0 && (
                <div className="flex items-center">
                    {Array.from({ length: segments - 1 }, (_, index) => {
                        const tickPct = ((index + 1) / segments) * 100;
                        const major = (index + 1) % majorEvery === 0;
                        return (
                            <div
                                key={index}
                                className="flex flex-1 justify-end"
                            >
                                <div
                                    className={cn(
                                        'w-px rounded-full',
                                        major ? 'h-4' : 'h-2',
                                        tickPct < pct
                                            ? 'bg-primary-foreground/50'
                                            : 'bg-muted-foreground/50',
                                    )}
                                />
                            </div>
                        );
                    })}
                    <div className="flex-1" />
                </div>
            )}
        </div>
    );
}

type ValueSliderThumbProps = Omit<
    React.ComponentProps<'div'>,
    'children' | 'role'
> & {
    /** Shows the tooltip with the formatted value. Default: true. */
    showTooltip?: boolean;
};

/**
 * Draggable handle; also the focus/keyboard target (`role="slider"`). Taller
 * than the bar on purpose: `self-center` splits the overflow evenly.
 */
export function ValueSliderThumb({
    showTooltip = true,
    className,
    style,
    onPointerDown,
    onKeyDown,
    ...props
}: ValueSliderThumbProps) {
    const {
        value,
        pct,
        min,
        max,
        disabled,
        dragging,
        formatValue,
        startDrag,
        onThumbKeyDown,
    } = useValueSliderState();
    const position = placeInBar('center', pct);
    const label = formatValue(value);

    return (
        <div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={label}
            aria-disabled={disabled}
            data-dragging={dragging || undefined}
            onPointerDown={(e) => {
                onPointerDown?.(e);
                if (disabled) return;
                e.preventDefault(); // no text selection while dragging
                e.stopPropagation(); // the bar would jump to the pointer
                startDrag();
            }}
            onKeyDown={(e) => {
                onKeyDown?.(e);
                if (!e.defaultPrevented) onThumbKeyDown(e);
            }}
            className={cn(
                'group/thumb relative flex h-10 w-2.5 touch-none items-center justify-center self-center rounded-[5px] bg-primary shadow-[0_2px_6px_rgba(0,0,0,0.25)] ring-[3px] ring-card transition-transform duration-150 focus-visible:outline-none',
                position.className,
                disabled
                    ? 'cursor-not-allowed'
                    : 'cursor-grab hover:scale-x-125 focus-visible:scale-x-125 data-dragging:scale-x-125 data-dragging:cursor-grabbing',
                className,
            )}
            style={{ ...position.style, ...style }}
            {...props}
        >
            <div className="h-4 w-0.5 rounded-full bg-card/85" />
            {showTooltip && (
                <span
                    aria-hidden
                    className={cn(
                        'pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-medium whitespace-nowrap text-background opacity-0 shadow-md transition-opacity duration-150',
                        'group-hover/thumb:opacity-100 group-focus-visible/thumb:opacity-100',
                        dragging && 'opacity-100',
                    )}
                >
                    {label}
                </span>
            )}
        </div>
    );
}

type ValueSliderIndicatorsProps = React.ComponentProps<'div'> & {
    /** Values shown on the scale. Default: min, quarters, max. */
    values?: number[];
};

/** Scale below the bar; aligns by the same rules as the bar's parts. */
export function ValueSliderIndicators({
    values,
    className,
    ...props
}: ValueSliderIndicatorsProps) {
    const { min, max, formatValue } = useValueSliderState();
    const marks =
        values ?? [0, 0.25, 0.5, 0.75, 1].map((r) => min + r * (max - min));

    return (
        <div
            className={cn(
                'mt-1 grid grid-cols-1 grid-rows-1 *:col-start-1 *:row-start-1',
                className,
            )}
            {...props}
        >
            {marks.map((mark, index) => {
                // the edge labels hug the border, otherwise they'd spill out
                const anchor: Anchor =
                    index === 0
                        ? 'start'
                        : index === marks.length - 1
                          ? 'end'
                          : 'center';
                const pct = ((mark - min) / (max - min)) * 100;
                const position = placeInBar(anchor, pct);

                return (
                    <div
                        key={mark}
                        className={cn(
                            'text-[10px] text-muted-foreground',
                            position.className,
                        )}
                        style={position.style}
                    >
                        {formatValue(mark)}
                    </div>
                );
            })}
        </div>
    );
}
