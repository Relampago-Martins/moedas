import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { mesAtual, mesOptions } from "../lib/selectMes";

export function SelectMes(){

    return (
        <Select defaultValue={mesAtual.value}>
            <SelectTrigger className="text-sm w-[10rem]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {mesOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}