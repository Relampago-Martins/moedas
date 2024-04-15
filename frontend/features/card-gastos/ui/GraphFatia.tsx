import { Sector } from 'recharts';

export const FatiaAtiva = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
        props;
    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                cornerRadius={3}
                outerRadius={outerRadius + 5}
                startAngle={startAngle - 2}
                endAngle={endAngle + 2}
                innerRadius={innerRadius + 5}
                className="cursor-pointer"
                fill={fill}
            />
        </g>
    );
};

export const FatiaInativa = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
        props;
    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                cornerRadius={3}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                startAngle={startAngle - 0.8}
                endAngle={endAngle + 0.8}
                className="cursor-pointer"
                fill={fill}
            />
        </g>
    );
};
