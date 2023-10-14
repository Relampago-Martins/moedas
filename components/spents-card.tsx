import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function Spent(){
    return (
        <Card className="flex-1 h-[15.5rem]">
            <CardHeader>
                <CardTitle>My Monthly Spent</CardTitle>
                <CardDescription>*****</CardDescription>
            </CardHeader>
        </Card>
    )
};