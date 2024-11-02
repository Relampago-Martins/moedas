import { SparklesIcon } from 'lucide-react';

export function AnaliseCard() {
    return (
        <div className="rounded-lg border-[1px] border-[#FC440F] bg-card px-2 py-2 shadow-sm shadow-orange-500">
            <h4 className="text-base ">Análise de gastos</h4>
            <div className="text-sm text-muted">
                O aumento no Lazer em 47% e em Alimentação em 50% indica que o
                usuário pode estar dedicando mais tempo a atividades externas ou
                sociais.
            </div>
            <button className="mt-3 flex items-center gap-2 rounded bg-orange-100 px-2 py-1 text-sm text-[#FC440F]">
                <SparklesIcon className="h-4 w-4" />
                Ajustar orçamento
            </button>
        </div>
    );
}
