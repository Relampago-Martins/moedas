import { Despesa } from '@/types/models/despesa';

type CategoriaBadgeProps = {
    categoria: Despesa['categoria'];
    semIcone?: boolean;
};
export function CategoriaBadge({ categoria, semIcone }: CategoriaBadgeProps) {
    return (
        <div className="flex">
            <div
                className="flex items-center gap-2 rounded-md px-2 text-background"
                style={{
                    backgroundColor: categoria.cor,
                }}
            >
                {!semIcone && <i className={`${categoria.icone} text-2xl`}></i>}
                <span className="text-sm">{categoria.nome}</span>
            </div>
        </div>
    );
}
