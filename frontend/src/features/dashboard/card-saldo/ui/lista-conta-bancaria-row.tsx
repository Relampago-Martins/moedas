import { AvatarBanco } from '@/features/conta-bancaria/ui/shared/avatar-banco';
import { numberToCurrency } from '@/shared/lib/utils';
import { ContaBancaria } from '@/types/models/conta-bancaria';
import styles from './styles.module.scss';

type ListaContasBancariasProps = { contasBancarias: ContaBancaria[] };
export function ListaContaBancariaRow({
    contasBancarias,
}: ListaContasBancariasProps) {
    return (
        <div className="flex items-center gap-2">
            <div className={`flex flex-row gap-4 ${styles.horizontalScroll}`}>
                {contasBancarias.map((conta) => (
                    <div
                        key={conta.id}
                        className="flex items-center rounded-full bg-muted-foreground"
                    >
                        <AvatarBanco banco={conta.banco} />
                        <span className="px-2 text-sm text-foreground">
                            {numberToCurrency(conta.saldo)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
