import { numberToCurrency } from '@/shared/lib/utils';
import { useState } from 'react';
import { Sector } from 'recharts';

export const FatiaAtiva = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        percent,
        payload,
    } = props;
    return (
        <g>
            <text
                className="text-center text-2xl font-semibold"
                x={cx}
                y={cy}
                textAnchor="middle"
                fill={fill}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
            <text
                className="text-center text-sm font-normal"
                x={cx}
                y={cy}
                dy={20}
                textAnchor="middle"
                fill={fill}
            >
                {numberToCurrency(payload.valor)}
            </text>

            <Sector
                cx={cx}
                cy={cy}
                cornerRadius={3}
                outerRadius={outerRadius + 5}
                startAngle={startAngle - 2}
                endAngle={endAngle + 2}
                // make it a dunut chart
                innerRadius={innerRadius + 5}
                fill={fill}
            />
        </g>
    );
};

export const FatiaInativa = (props: any) => {
    'use client';
    const [onHover, setOnHover] = useState(false);
    const {
        cx,
        cy,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        percent,
        payload,
    } = props;
    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                cornerRadius={3}
                outerRadius={onHover ? outerRadius + 3 : outerRadius}
                innerRadius={onHover ? innerRadius + 3 : innerRadius}
                startAngle={startAngle - 0.8}
                endAngle={endAngle + 0.8}
                fill={fill}
                onMouseOver={(event) => {
                    setOnHover(true);
                    event.currentTarget.style.cursor = 'pointer';
                }}
                onMouseOut={(event) => {
                    setOnHover(false);
                }}
            />
        </g>
    );
};
