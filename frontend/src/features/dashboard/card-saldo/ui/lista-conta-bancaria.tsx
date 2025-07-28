import { numberToCurrency } from '@/shared/lib/utils';
import { ContaBancaria } from '@/types/models/conta-bancaria';
import styles from './styles.module.scss';

type ListaContasBancariasProps = { contasBancarias: ContaBancaria[] };
export function ListaContasBancarias({
    contasBancarias,
}: ListaContasBancariasProps) {
    return (
        <div className="flex items-center gap-2">
            {/* <i className="ph ph-bank text-xl text-muted" />
            <span className="h-full w-[1px] bg-border" /> */}
            <div className={`flex flex-row gap-4 ${styles.horizontalScroll}`}>
                {contasBancarias.map((conta) => (
                    <div
                        key={conta.nome}
                        className="flex items-center rounded-full bg-muted-foreground"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                            <span className="text-xs font-normal">
                                {conta.nome.slice(0, 3)}
                            </span>
                        </div>
                        <span className="px-2 text-sm text-foreground">
                            {numberToCurrency(conta.saldo)}
                        </span>
                    </div>
                ))}
                {/* <div className="flex items-center">
                    <span className="rounded-full bg-primary p-1">
                        <i className="ph ph-plus flex text-base text-primary-foreground"></i>
                    </span>
                    Adicionar Conta
                </div> */}
            </div>
        </div>
    );
}
