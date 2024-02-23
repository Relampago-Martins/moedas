import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { data } from "../lib";

export function Grafico() {
    return (
        <ResponsiveContainer width={80} height={100}>
            <BarChart data={data} >
                {/* <Legend radius={10} /> */}
                <Bar dataKey="Receitas" fill="#16a34a" radius={[10, 10, 0, 0]}/>
                <Bar dataKey="Gastos" fill="#e11d48" radius={[10, 10, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}