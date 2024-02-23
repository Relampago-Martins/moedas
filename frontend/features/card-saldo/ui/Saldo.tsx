import { BsChevronRight, BsWallet2 } from "react-icons/bs";
import { mascaraDinheiro } from "../lib/saldo";
import './ui.scss';

type SaldoProps = {
    valor: number;
}

export function Saldo(props: SaldoProps) {
    return (
        <div className="saldo">
            <div className="text-2xl font-semibold text-secondary-foreground">
                {mascaraDinheiro(props.valor)}
            </div>
            <div className="flex align-center text-sm opacity-65 gap-1">
                <BsWallet2 className="h-3 self-center"/>
                Saldo atual
                <BsChevronRight className="h-3 self-center"/>
            </div>
        </div>
    )
}