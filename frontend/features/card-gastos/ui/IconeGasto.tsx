import { Computer, Pizza } from 'lucide-react';

/**
 * Recebe uma string com o nome de um icone e
 * retorna o icone correspondente.
 * Lib de ícones: https://lucide.dev/icons
 * @param icone
 * @returns JSX.Element
 */
export function IconeGasto(iconeName: string) {
    switch (iconeName) {
        case 'computer':
            return <Computer />;
        case 'pizza':
            return <Pizza />;
        default:
            return <div />;
    }
}
