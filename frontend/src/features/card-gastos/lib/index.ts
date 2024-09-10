import { Despesa } from "@/types/models/despesa";

export type Categoria = {
    nome: string;
    cor: string;
    label: string;
};

// cor única para todas as categorias, não repetir
export const categorias: Categoria[] = [
    {
        label: 'Eletrônicos',
        nome: 'ELET',
        cor: '#8884d8',
    },
    {
        nome: 'A',
        cor: '#82ca9d',
        label: 'Alimentação',
    },
    {
        nome: 'SERV',
        cor: '#ffc658',
        label: 'Serviços',
    },
    {
        nome: 'S',
        label: 'Saúde',
        cor: '#ff0000',
    },
    {
        nome: 'T',
        cor: '#ff7f0e',
        label: 'Transporte',
    },
    {
        nome: 'E',
        cor: '#60a5fa',
        label: 'Educação',
    },
    {
        label: 'lazer',
        nome: 'L',
        cor: '#ff0000',
    },
    {
        nome: 'V',
        cor: '#ff7f0e',
        label: 'Vestuário',
    },
    {
        nome: 'outros',
        cor: '#cbd5e1',
        label: 'Outros',
    },
];


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
 * Recebe uma lista de gastos e retorna uma lista de objetos
 * com o valor com o valor total gasto em cada categoria.
 * @param gastos
 * @returns `{ categoria: Categoria, valor: number  }`
 */
export function getGastosPorCategoria(gastos: Despesa[], categorias: Categoria[]) {
    const categoriasUsadas = categorias.filter(cat=> {
        return gastos.map(g=>g.categoria.value).includes(cat.nome)
    }); 
    return categoriasUsadas.map(categoria => {
        const somaValorGatos = gastos
            .filter(gasto => gasto.categoria.value === categoria.nome)
            .reduce((acumulador, gasto) => acumulador + gasto.valor, 0);
        return { categoria, valor: somaValorGatos};
    });
}

