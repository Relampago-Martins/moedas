import { ReadableTextColorDiv } from '@/shared/ui/custom/readable-text-color-div';
import { CategoriaTotalMov } from '@/types/models/categoria';

type CardCategoriaProps = {
    categoria: CategoriaTotalMov;
    onClick: () => void;
    percentualDoTotal: number;
    selecionado?: boolean;
    hide?: boolean;
};
export function CardCategoria({
    categoria,
    onClick,
    percentualDoTotal,
    selecionado,
    hide,
}: CardCategoriaProps) {
    return (
        <button
            onClick={onClick}
            className="relative h-12 rounded-md transition-transform hover:scale-105"
            key={categoria.sigla}
        >
            <ReadableTextColorDiv
                color={categoria.cor}
                className="flex items-center justify-center gap-2 px-2 py-1"
            >
                {selecionado ? (
                    <span className="font-semibold">
                        {percentualDoTotal.toFixed(0)}%
                    </span>
                ) : (
                    <i
                        className={`${categoria.icone} text-2xl ${hide ? 'opacity-20' : null}`}
                    ></i>
                )}
            </ReadableTextColorDiv>
            <div
                className="absolute inset-0 rounded-md opacity-20"
                style={{
                    backgroundColor: categoria.cor,
                }}
            />
        </button>
    );
}
