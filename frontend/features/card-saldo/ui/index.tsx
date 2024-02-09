import { Card, CardContent } from "@/shared/ui/card";
import { BsGraphDown, BsGraphUp } from "react-icons/bs";
import { CardTransacao } from "./CardTransacao";
import { Saldo } from "./Saldo";
import { SelectMes } from "./SelectMes";
import './ui.scss';

type CardSaldoProps = {
}

export function CardSaldo(props: CardSaldoProps) {

    return (
        <Card className="h-[15.5rem] flex-grow max-w-[26.5rem]">
            <CardContent className="flex flex-col h-full pt-6 gap-4 justify-between">
                    
                    <SelectMes/>
                    <Saldo valor={20000}/>
                    {/* <div className="text-sm opacity-65">
                        Minhas transações
                    </div> */}
                    <div className="flex flex-row gap-2 justify-start">
                        <CardTransacao>
                            <BsGraphUp className="h-4 w-6 text-green-700"/>
                            <div>Receitas</div>
                            <div>R$ 10,00</div>
                        </CardTransacao>
                        <CardTransacao>
                            <BsGraphDown className="h-4 w-6 text-red-700"/>
                            <div>Gastos</div>
                            <div>R$ 10,00</div>
                        </CardTransacao>
                    </div>
            </CardContent>
        </Card>
    )
}