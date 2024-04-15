import {
    BookOpen,
    Car,
    Computer,
    LucideProps,
    Pizza,
    StickyNote,
    Ticket,
} from 'lucide-react';

type IconeGastoProps = {
    iconeName: string | undefined;
} & LucideProps;
/**
 * Recebe uma string com o nome de um icone e
 * retorna o icone correspondente.
 * Lib de ícones: https://lucide.dev/icons
 * @param icone
 * @returns JSX.Element
 */
export function IconeGasto({ iconeName, ...props }: IconeGastoProps) {
    let Icone;
    switch (iconeName) {
        case 'computer':
            Icone = Computer;
            break;
        case 'pizza':
            Icone = Pizza;
            break;
        case 'car':
            Icone = Car;
            break;
        case 'service':
            Icone = Ticket;
            break;
        case 'education':
            Icone = BookOpen;
            break;
        case 'other':
            Icone = StickyNote;
            break;
    }
    return Icone ? <Icone {...props} /> : null;
}
