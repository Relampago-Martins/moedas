import { Categoria } from "@/types/models/categoria";

/**
* Calcula a cor do gráfico de pizza.
* Se o item não estiver ativo, a opacidade da cor diminui.
* @param categoria
* @param isActive
*/
export function calcColor(cor: Categoria['cor'], isActive: boolean) {
    if (isActive) { return cor + 40 }
    return cor;
}

/**
 * Recebe uma lista de movimentações e agrupa por data.
 * grupos de data:
 * - hoje: movimentações que ocorreram hoje
 * - ontem: movimentações que ocorreram ontem
 * - dd/mm: 2 dias atrás
 * - dd/mm: 3 dias atrás
 * - dd/mm: 4 dias atrás
 * - dd/mm: 5 dias atrás
 * - dd/mm: 6 dias atrás
 * - dd/mm: mais de 6 dias atrás
 */
//export function segmentarPorDatas(movimentacoes: Movimentacao[]) {
//    const agrupados = movimentacoes.reduce((
//        
//    )=>{
//        return
//    })
//
//    return agrupados;
//}