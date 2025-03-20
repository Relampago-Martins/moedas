import { Despesa } from '@/types/models/despesa';

type CategoriaBadgeProps = {
    categoria: Despesa['categoria'];
    semIcone?: boolean;
};
export function CategoriaBadge({ categoria, semIcone }: CategoriaBadgeProps) {
    return (
        <div
            className="flex w-full items-center justify-center gap-2 rounded-md border px-2 py-1 text-background"
            style={{
                backgroundColor: categoria.cor.fundo_com_opacidade,
                color: categoria.cor.texto,
                borderColor: categoria.cor.texto,
            }}
        >
            {!semIcone && <i className={`${categoria.icone} text-2xl`}></i>}
            <span className="text-base font-medium">{categoria.nome}</span>
        </div>
    );
}
