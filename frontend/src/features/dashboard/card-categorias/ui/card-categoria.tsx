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
            onClick={selecionado ? undefined : onClick}
            className="relative flex items-center gap-2 rounded-md border transition-transform hover:scale-105"
            key={categoria.sigla}
        >
            <ReadableTextColorDiv
                color={categoria.cor}
                className="flex items-center gap-2 px-3 py-2"
            >
                {selecionado ? (
                    <i className="ph-bold ph-check text-2xl"></i>
                ) : (
                    <i className={`${categoria.icone} text-2xl`}></i>
                )}
                <span className={`text-sm ${selecionado ? 'font-bold' : ''}`}>
                    {categoria.nome}
                </span>
                <span className="w-full text-end text-sm">
                    {porcentualDoTotal.toFixed(1).replace('.', ',')}%
                </span>
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
