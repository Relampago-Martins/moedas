import { ReadableTextColorDiv } from '@/shared/ui/custom/readable-text-color-div';
import { CategoriaTotalMov } from '@/types/models/categoria';

type CardCategoriaProps = {
    categoria: CategoriaTotalMov;
    onClick: () => void;
    porcentualDoTotal: number;
    selecionado?: boolean;
};
export function CardCategoria({
    categoria,
    onClick,
    porcentualDoTotal,
    selecionado,
}: CardCategoriaProps) {
    return (
        <button
            onClick={onClick}
            className="relative h-10 rounded-md border transition-transform hover:scale-105"
            style={{
                width: `${porcentualDoTotal}%`,
            }}
            key={categoria.sigla}
        >
            <ReadableTextColorDiv
                color={categoria.cor}
                className="flex items-center justify-center gap-2 px-2 py-1"
            >
                {selecionado ? (
                    <i className="ph-bold ph-check text-2xl"></i>
                ) : (
                    <i className={`${categoria.icone} text-2xl`}></i>
                )}
            </ReadableTextColorDiv>
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundColor: categoria.cor,
                }}
            />
        </button>
    );
}
