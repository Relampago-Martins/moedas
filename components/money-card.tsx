'use client'
import { useTheme } from "next-themes";
import { PieChart } from "react-minimal-pie-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function Money(){
    const { theme } = useTheme();
    return (
    <Card className="h-[15.5rem] w-[15rem] hover:scale-105 transition-transform ease-out">
        <a href="#">
            <CardHeader className="pb-3">
                <CardTitle>My Money</CardTitle>
                <CardDescription>*****</CardDescription>
            </CardHeader>
            <CardContent className="relative">
                <PieChart
                    data={[
                        { title: 'money available', value: 10, color: '#fde047'},
                        { title: 'money spent', value: 15, color: '#fef3c7'},
                    ]}
                    startAngle={-180}
                    lengthAngle={180}
                    lineWidth={45}
                    animate
                    animationDuration={1000}
                    animationEasing="ease-out"
                    paddingAngle={0}
                    viewBoxSize={[100, 50]}
                />
                <span className="flex item-center justify-center text-card-foreground mt-2">
                    <span className="text-2xl font-semibold text-muted-foreground">R$ 100,00</span>
                </span>
            </CardContent>
        </a>
    </Card>
    )
}