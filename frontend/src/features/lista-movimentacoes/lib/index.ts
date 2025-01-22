import { Movimentacao } from "@/types/models/movimentacao";


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