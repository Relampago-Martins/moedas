import { numberToCurrency } from '@/shared/lib/utils';

type DinTileProps = {
    label: string;
    valor: number;
    icon?: React.ReactElement;
};
export function DinTile({ label, valor, icon }: DinTileProps) {
    return (
        <div className="flex items-center gap-4">
            {icon}
            <div className="flex flex-col">
                <span className="text-xs text-muted">{label}</span>
                <div className="flex items-center">
                    <span className="mr-1 text-sm text-muted">R$</span>
                    <span className="text-lg">
                        {numberToCurrency(valor).replace('R$', '').trim()}
                    </span>
                </div>
            </div>
        </div>
    );
}
