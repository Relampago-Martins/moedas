export type Categoria = 'Eletrônicos' | 'Alimentação' | 'Serviços';

type Gasto = {
    name: string;
    value: number;
    categoria: Categoria;
};

type MapCategoriaCor = {
    [key in Categoria]: string;
};

export const gastos: Gasto[] = [
    {name: 'Iphone 11', value: 700.2, categoria: 'Eletrônicos'},
    {name: 'Amburguer do Sulla', value: 35.11, categoria: 'Alimentação'},
    {name: 'Café do Starbucks', value: 25.99, categoria: 'Alimentação'},
    {name: 'Spotify', value: 19.99 , categoria: 'Serviços'},
]


export const map_catergotia_cor: MapCategoriaCor = {
    'Eletrônicos': '#8884d8',
    'Alimentação': '#82ca9d',
    'Serviços': '#ffc658',
}