import { CategoriaTotalMov } from '@/types/models/categoria';

type CardCategoriaProps = {
    categoria: CategoriaTotalMov;
    onClick: () => void;
    selecionado?: boolean;
    hide?: boolean;
};
export function CardCategoria({
    categoria,
    onClick,
    selecionado,
    hide,
}: CardCategoriaProps) {
    return (
        <button
            onClick={onClick}
            className="relative h-12 rounded-md transition-transform hover:scale-105 selecionado:scale-110"
            data-selecionado={selecionado}
            style={{
                backgroundColor: categoria.cor_fundo,
                opacity: hide ? 0.5 : 1,
            }}
            key={categoria.sigla}
        >
            <div
                className="flex items-center justify-center gap-2 px-2 py-1"
                style={{
                    color: categoria.cor_texto,
                }}
            >
                <i className={`${categoria.icone} text-2xl`}></i>
            </div>
        </button>
    );
}
