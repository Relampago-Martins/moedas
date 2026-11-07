'use client';
import {
    ExpandableDialog,
    ExpandableDialogBody,
    ExpandableDialogContent,
    ExpandableDialogTrigger,
    ExpandableDialogTriggerText,
} from '@/shared/ui/custom/expandable-dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useState } from 'react';

type CardSaldoDialogProps = {
    className?: string;
    /** O cartão do dashboard, de onde o modal sai. */
    trigger: React.ReactNode;
    children: React.ReactNode;
};

/**
 * A parte interativa do card de saldo: o cartão cresce até virar o modal de
 * saldo e contas. Fica separada para o `CardSaldo` continuar buscando os dados
 * no servidor.
 */
export function CardSaldoDialog({
    className,
    trigger,
    children,
}: CardSaldoDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <ExpandableDialog id="card-saldo" open={open} onOpenChange={setOpen}>
            <ExpandableDialogTrigger
                className={`${className} flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground`}
            >
                <ExpandableDialogTriggerText className="flex h-full flex-col text-base font-normal">
                    {trigger}
                </ExpandableDialogTriggerText>
            </ExpandableDialogTrigger>
            <ExpandableDialogContent
                className="overflow-hidden"
                showCloseButton={false}
            >
                <DialogTitle className="sr-only">
                    Detalhes do saldo e contas bancárias
                </DialogTitle>
                <ExpandableDialogBody>{children}</ExpandableDialogBody>
            </ExpandableDialogContent>
        </ExpandableDialog>
    );
}
