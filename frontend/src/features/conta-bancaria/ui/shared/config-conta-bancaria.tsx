import { Command, CommandItem, CommandList } from '@/shared/ui/command';
import {
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';
import { Popover, PopoverContent } from '@/shared/ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { useState } from 'react';

export type ConfigEventName =
    | 'onEditarApelido'
    | 'onCorrigirSaldo'
    | 'onDesativar'
    | 'onExcluir';

type Props = {
    children?: React.ReactNode;
    className?: string;
    onEvent: (eventName: ConfigEventName) => void;
};
export function ConfigContaBancaria({ children, className, onEvent }: Props) {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const handleClick = (eventName: ConfigEventName) => {
        setPopoverOpen(false);
        setTimeout(() => {
            onEvent(eventName);
        }, 100);
    };

    return (
        <Popover modal open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger className={className}>{children}</PopoverTrigger>
            <PopoverContent align="start" side="bottom" className="w-56 p-1">
                <Command>
                    <CommandList>
                        <DropdownMenuLabel>Opções</DropdownMenuLabel>

                        <CommandItem
                            className="gap-2"
                            onSelect={handleClick.bind(null, 'onEditarApelido')}
                        >
                            <i className="ph ph-pencil flex text-base" />
                            Alterar apelido
                        </CommandItem>

                        <CommandItem
                            className="gap-2"
                            onSelect={handleClick.bind(null, 'onCorrigirSaldo')}
                        >
                            <i className="ph ph-currency-dollar flex text-base" />
                            Corrigir saldo
                        </CommandItem>
                        <DropdownMenuSeparator />

                        <CommandItem
                            className="gap-2 text-muted"
                            onSelect={handleClick.bind(null, 'onDesativar')}
                        >
                            <i className="ph ph-lock-key flex text-base" />
                            Desativar conta
                        </CommandItem>

                        <CommandItem
                            className="gap-2 text-destructive-foreground"
                            onSelect={handleClick.bind(null, 'onExcluir')}
                        >
                            <i className="ph ph-trash flex text-base" />
                            Excluir conta
                        </CommandItem>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
