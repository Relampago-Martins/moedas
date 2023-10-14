import { columns } from "./spents/columns";
import { DataTable } from "./spents/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }

export function Spent(){
    const data: Payment[] =  [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "489e1d42",
            amount: 125,
            status: "processing",
            email: "example@gmail.com",
        },
        {
            id: "489e1z42",
            amount: 125,
            status: "processing",
            email: "example@gmail.com",
        },
        {
            id: "489i1z42",
            amount: 125,
            status: "processing",
            email: "example@gmail.com",
        },
    ]
    return (
        <Card className="flex-1 h-[15.5rem] flex flex-col">
            <CardHeader className="pb-3">
                <CardTitle>My Monthly Spent</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[11rem]">
                    <DataTable columns={columns} data={data} />
                </ScrollArea>
            </CardContent>
        </Card>
    )
};