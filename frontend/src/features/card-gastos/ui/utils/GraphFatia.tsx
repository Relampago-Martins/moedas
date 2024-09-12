import { motion } from 'framer-motion';
import { Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

export const FatiaAtiva = (props: PieSectorDataItem) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
        props;

    return (
        <motion.g
            key={`fatia-${props.name}`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.3, type: 'spring', bounce: 0 }}
        >
            <Sector
                cx={cx}
                cy={cy}
                cornerRadius={3}
                outerRadius={subtractIfExist(outerRadius, 5)}
                innerRadius={subtractIfExist(innerRadius, 5)}
                startAngle={subtractIfExist(startAngle, -2)}
                endAngle={subtractIfExist(endAngle, 2)}
                className="cursor-pointer"
                fill={fill}
            />
        </motion.g>
    );
};

export const FatiaInativa = (props: PieSectorDataItem) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
        props;
    return (
        <motion.g key={`fatia-${props.name}`}>
            <Sector
                cx={cx}
                cy={cy}
                cornerRadius={3}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                startAngle={subtractIfExist(startAngle, -0.8)}
                endAngle={subtractIfExist(endAngle, 0.8)}
                className="cursor-pointer"
                fill={fill}
            />
        </motion.g>
    );
};

function subtractIfExist(value: number | undefined, subtract: number) {
    return value ? value + subtract : value;
}
