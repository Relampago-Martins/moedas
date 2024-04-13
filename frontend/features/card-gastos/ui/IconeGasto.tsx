import {
    BookOpen,
    Car,
    Computer,
    Pizza,
    StickyNote,
    Ticket,
} from 'lucide-react';

/**
 * Recebe uma string com o nome de um icone e
 * retorna o icone correspondente.
 * Lib de ícones: https://lucide.dev/icons
 * @param icone
 * @returns JSX.Element
 */
export function IconeGasto(iconeName: string | undefined) {
    switch (iconeName) {
        case 'computer':
            return <Computer />;
        case 'pizza':
            return <Pizza />;
        case 'car':
            return <Car />;
        case 'service':
            return <Ticket />;
        case 'education':
            return <BookOpen />;
        case 'other':
            return <StickyNote />;
        default:
            return;
    }
}
