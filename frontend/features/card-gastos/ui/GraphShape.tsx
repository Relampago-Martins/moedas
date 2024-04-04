import { Sector } from 'recharts';
import './style.scss';

export const renderActiveShape = (props: any) => {
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
                className="porcentagem"
                x={cx}
                y={cy}
                dy={6}
                dx={2}
                textAnchor="middle"
                fill={fill}
            >
                {`${(percent * 100).toFixed(2)}%`}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                outerRadius={outerRadius + 4}
                startAngle={startAngle}
                endAngle={endAngle}
                // make it a dunut chart
                innerRadius={innerRadius + 4}
                fill={fill}
                onMouseOver={(event) => {
                    event.currentTarget.style.cursor = 'pointer';
                }}
            />
        </g>
    );
};
