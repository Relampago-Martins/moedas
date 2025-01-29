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
        const data = new Date(movimentacao.data).toLocaleDateString();
        const index = movimentacoesPorData.findIndex(
            (movimentacaoPorData) => movimentacaoPorData.data === data
        );
        if (index === -1) {
            movimentacoesPorData.push({ data, movimentacoes: [movimentacao] });
        } else {
            movimentacoesPorData[index].movimentacoes.push(movimentacao);
        }
    }
    return movimentacoesPorData;
}

/**
 * 
 * Recebe uma data em formato mm/dd/yyyy e
 * se a data for de 7 dias atrás usa o date ago
 * se não retorna a data no formato 9 Set 2022
 */
export function cleanDate(date: string) {
    const dateObj = new Date(date);
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    if (diff < 604800000) {
        return formatDistanceToNow(dateObj,  { addSuffix: true, locale: ptBR });
    }
    return dateObj.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}