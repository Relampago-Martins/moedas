'use client';

import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

export type ValueSliderConfig = {
    value: number;
    onChange: (value: number) => void;
    /** Called once the user lets go (pointer up) or after a key press. */
    onCommit?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    formatValue?: (value: number) => string;
};

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function decimalsOf(step: number) {
    const [, decimals = ''] = String(step).split('.');
    return decimals.length;
}

/**
 * Pointer and keyboard logic of a single-value slider. Knows nothing about
 * markup: the bar registers `barRef` and `onBarPointerDown`, the thumb uses
 * `startDrag` and `onThumbKeyDown`.
 */
export function useValueSlider({
    value,
    onChange,
    onCommit,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    formatValue = String,
}: ValueSliderConfig) {
    const barRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);

    // the window listeners outlive renders, so they read the latest values here
    const latest = useRef({ value, onChange, onCommit });
    useLayoutEffect(() => {
        latest.current = { value, onChange, onCommit };
    });

    const snap = useCallback(
        (raw: number) => {
            const snapped = Math.round((raw - min) / step) * step + min;
            return Number(clamp(snapped, min, max).toFixed(decimalsOf(step)));
        },
        [min, max, step],
    );

    const valueFromClientX = useCallback(
        (clientX: number) => {
            const rect = barRef.current?.getBoundingClientRect();
            if (!rect || rect.width === 0) return latest.current.value;
            const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
            return snap(min + ratio * (max - min));
        },
        [snap, min, max],
    );

    const update = useCallback((next: number) => {
        if (next !== latest.current.value) latest.current.onChange(next);
        latest.current.value = next;
    }, []);

    useEffect(() => {
        if (!dragging) return;

        const onMove = (e: PointerEvent) => update(valueFromClientX(e.clientX));
        const onUp = () => {
            setDragging(false);
            latest.current.onCommit?.(latest.current.value);
        };

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);
        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
        };
    }, [dragging, update, valueFromClientX]);

    const startDrag = useCallback(() => {
        if (!disabled) setDragging(true);
    }, [disabled]);

    /** Clicking anywhere on the bar jumps there and keeps dragging. */
    const onBarPointerDown = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (disabled || e.button !== 0) return;
            e.preventDefault();
            update(valueFromClientX(e.clientX));
            setDragging(true);
        },
        [disabled, update, valueFromClientX],
    );

    const onThumbKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLElement>) => {
            if (disabled) return;
            const bigStep = step * 10;
            const current = latest.current.value;
            const next = {
                ArrowLeft: current - step,
                ArrowDown: current - step,
                ArrowRight: current + step,
                ArrowUp: current + step,
                PageDown: current - bigStep,
                PageUp: current + bigStep,
                Home: min,
                End: max,
            }[e.key];
            if (next === undefined) return;
            e.preventDefault();
            update(snap(next));
            latest.current.onCommit?.(latest.current.value);
        },
        [disabled, step, min, max, snap, update],
    );

    const pct =
        max === min ? 0 : ((clamp(value, min, max) - min) / (max - min)) * 100;

    return {
        value,
        pct,
        min,
        max,
        step,
        disabled,
        dragging,
        formatValue,
        barRef,
        onBarPointerDown,
        startDrag,
        onThumbKeyDown,
    };
}

export type ValueSliderState = ReturnType<typeof useValueSlider>;
