export function mascaraDinheiro(valor: number) {
    return valor.toLocaleString(
        'pt-BR', { style: 'currency', currency: 'BRL' }
    );
}