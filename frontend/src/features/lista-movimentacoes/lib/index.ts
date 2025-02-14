import { toLocalDate } from "@/shared/lib/utils";
import { Movimentacao } from "@/types/models/movimentacao";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';



type MovimentacaoPorData = {
    data: string;
    movimentacoes: Movimentacao[];
}
/**
 * Recebe uma lista de movimentações e retorna uma lista de dicionarios
 * cada dicionario tem duas informações: a data e as movimentações daquela data
 */
export function separarPorDatas(movimentacoes: Movimentacao[]) {
    const movimentacoesPorData: MovimentacaoPorData[] = [];
    for (const movimentacao of movimentacoes) {
        const index = movimentacoesPorData.findIndex(
            (movimentacaoPorData) => movimentacaoPorData.data === movimentacao.data
        );
        if (index === -1) {
            movimentacoesPorData.push({ data: movimentacao.data, movimentacoes: [movimentacao] });
        } else {
            movimentacoesPorData[index].movimentacoes.push(movimentacao);
        }
    }
    return movimentacoesPorData;
}

/**
 * Recebe uma data no formato yyyy-mm-dd e retorna uma string formatada.
 * Se for hoje, retorna "Hoje".
 * Se for ontem, retorna "Ontem".
 * Se estiver dentro dos últimos 7 dias, retorna "há X dias".
 * Caso contrário, retorna a data formatada (ex: 9 Set 2022).
 */
export function cleanDate(date: string): string {
    const [year, month, day] = date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const now = new Date();
    
    const diffDays = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));

    switch (diffDays) {
        case 0:
            return 'Hoje';
        case 1:
            return 'Ontem';
        default:
            if (diffDays < 7) {
                return formatDistanceToNow(dateObj, { addSuffix: true, locale: ptBR });
            }
            if (dateObj.getFullYear() === now.getFullYear()) {
                return dateObj.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
            }
            return toLocalDate(dateObj.toISOString().split('T')[0]);
    }
}
