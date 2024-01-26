import { Receipt } from "lucide-react";
import { Transaction, columns } from "../spents/columns";
import { DataTable } from "../spents/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export function TabelaTransacoes(){
    const data: Transaction[] =  [
        {
            id: "728ed52f",
            description: "Selling of toy car",
            value: "R$ 100,00",
            type: "income",
            date: "10/2",
        },
        {
            id: "489e1d42",
            description: "Sushi",
            value: "R$ 125,00",
            type: "spent",
            date: "10/2",
        },
        {
            id: "489e1z42",
            description: "Sulla's burger",
            value: "R$ 35,00",
            type: "spent",
            date: "10/2",
        },
        {
            id: "489i1z42",
            description: "Iphone 11 (4/12)",
            value: "R$ 308,50",
            type: "expense",
            date: "10/2",
        },
    ]
    return (
        <Card className="h-[15.5rem] w-full flex flex-col grow basis-64">
            <CardHeader className="pb-3">
                <CardTitle className="flex flex-row gap-2">
                    <Receipt/>
                    Transações mensais
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[11rem]">
                    <DataTable columns={columns} data={data} />
                </ScrollArea>
            </CardContent>
        </Card>
    )
};