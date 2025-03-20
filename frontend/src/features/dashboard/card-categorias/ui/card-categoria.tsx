import { CategoriaTotalMov } from '@/types/models/categoria';
import { useTheme } from 'next-themes';

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
    const isDarkMode = useTheme().theme === 'dark';
    const corTexto = isDarkMode ? categoria.cor.fundo : categoria.cor.texto;
    const corFundo = isDarkMode
        ? categoria.cor.fundo_com_opacidade
        : categoria.cor.fundo;
    return (
        <button
            onClick={onClick}
            className="h-12 rounded-md shadow transition-transform hover:scale-105 selecionado:scale-110 selecionado:border-2"
            data-selecionado={selecionado}
            style={{
                backgroundColor:
                    selecionado && !isDarkMode ? corTexto : corFundo,
                borderColor: corFundo,
            }}
            key={categoria.sigla}
        >
            <div
                className="flex items-center justify-center gap-2 px-2 py-1"
                style={{
                    color: selecionado && !isDarkMode ? corFundo : corTexto,
                    opacity: hide ? 0.35 : 1,
                }}
            >
                <i className={`${categoria.icone} text-2xl`}></i>
            </div>
        </button>
    );
}
