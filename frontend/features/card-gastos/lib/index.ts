export type Categoria = {
    nome: 'eletronicos' | 'alimentacao' | 'servicos' | 'transporte' | 'educacao' | 'outros';
    cor: string;
    icone: string;
    label: string;
};

export type Gasto = {
    nome: string;
    valor: number;
    categoria: Categoria['nome'];
};

export const gastos: Gasto[] = [
    {nome: 'Iphone 11', valor: 250.2, categoria: 'eletronicos'},
    {nome: 'Hamburguer do Sula', valor: 35.11, categoria: 'alimentacao'},
    {nome: 'Café do Starbucks', valor: 25.99, categoria: 'alimentacao'},
    {nome: 'Spotify', valor: 19.99 , categoria: 'servicos'},
    {nome: 'Uber', valor: 20.00, categoria: 'transporte'},
    {nome: 'Curso de React', valor: 20.00, categoria: 'educacao'},
    {nome: 'Curso de Inglês', valor: 20.00, categoria: 'educacao'},
    {nome: 'Pix pro Carlos', valor: 50.00, categoria: 'outros'},
]

// cor única para todas as categorias, não repetir
export const categorias: Categoria[] = [
    {
        nome: 'eletronicos',
        cor: '#8884d8',
        icone: 'computer',
        label: 'Eletrônicos',
    },
    {
        nome: 'alimentacao',
        cor: '#82ca9d',
        icone: 'pizza',
        label: 'Alimentação',
    },
    {
        nome: 'servicos',
        cor: '#ffc658',
        icone: '💻',
        label: 'Serviços',
    },
    {
        nome: 'transporte',
        cor: '#ff7f0e',
        icone: '🚗',
        label: 'Transporte',
    },
    {
        nome: 'educacao',
        cor: '#60a5fa',
        icone: '📚',
        label: 'Educação',
    },
    {
        nome: 'outros',
        cor: '#cbd5e1',
        icone: '🤷',
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
export function getGastosPorCategoria(gastos: Gasto[], categorias: Categoria[]) {
    return categorias.map(categoria => {
        const somaValorGatos = gastos
            .filter(gasto => gasto.categoria === categoria.nome)
            .reduce((acumulador, gasto) => acumulador + gasto.valor, 0);
        return { categoria, valor: somaValorGatos};
    });
}

