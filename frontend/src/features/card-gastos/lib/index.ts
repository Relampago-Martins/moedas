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
