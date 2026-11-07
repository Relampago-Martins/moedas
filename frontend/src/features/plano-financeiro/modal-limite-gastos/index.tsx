'use client';
import { Button } from '@/shared/ui/button';
import {
    ExpandableDialog,
    ExpandableDialogBody,
    ExpandableDialogContent,
    ExpandableDialogDescription,
    ExpandableDialogHeader,
    ExpandableDialogIcon,
    ExpandableDialogTitle,
    ExpandableDialogTrigger,
    ExpandableDialogTriggerText,
} from '@/shared/ui/custom/expandable-dialog';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/shared/ui/drawer';
import { Form } from '@/shared/ui/form';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { LimiteGastosField } from './limite-gastos-field';
import { useLimiteGastosForm } from './use-limite-gastos-form';

const TITULO = 'Limite de gastos';
const DESCRICAO =
    'Defina quanto da sua renda pode ser gasto no mês. Dá para mudar quando quiser.';

type ModalLimiteGastosProps = {
    className?: string;
};

/** Dialog that grows from its trigger on desktop, bottom drawer on mobile. */
export function ModalLimiteGastos({ className }: ModalLimiteGastosProps) {
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const [open, setOpen] = useState(false);
    const { form, onSubmit } = useLimiteGastosForm(open, () => setOpen(false));
    const { isSubmitting } = form.formState;

    const content = (
        <Form {...form}>
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <LimiteGastosField control={form.control} />
                <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <Button
                        type="button"
                        variant="outline"
                        className="sm:w-32"
                        onClick={() => setOpen(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="sm:flex-1"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Salvando...' : 'Salvar limite'}
                    </Button>
                </div>
            </form>
        </Form>
    );

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={setOpen} repositionInputs={false}>
                <DrawerTrigger className={className}>
                    <i className="ph ph-plus-circle text-2xl" />
                    <span className="font-normal">Adicionar</span>
                </DrawerTrigger>
                <DrawerContent className="bg-popover">
                    <DrawerHeader className="px-0 text-left">
                        <DrawerTitle>{TITULO}</DrawerTitle>
                        <DrawerDescription>{DESCRICAO}</DrawerDescription>
                    </DrawerHeader>
                    <div className="pb-6">{content}</div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <ExpandableDialog id="limite-gastos" open={open} onOpenChange={setOpen}>
            <ExpandableDialogTrigger className={className}>
                <ExpandableDialogIcon className="size-7 bg-transparent text-muted">
                    <i className="ph ph-plus-circle text-2xl" />
                </ExpandableDialogIcon>
                <ExpandableDialogTriggerText className="font-normal text-muted">
                    Adicionar
                </ExpandableDialogTriggerText>
            </ExpandableDialogTrigger>
            <ExpandableDialogContent>
                <ExpandableDialogHeader className="flex-row items-start gap-3">
                    <ExpandableDialogIcon>
                        <i className="ph ph-crosshair text-2xl" />
                    </ExpandableDialogIcon>
                    <div className="flex flex-col gap-1">
                        <ExpandableDialogTitle>{TITULO}</ExpandableDialogTitle>
                        <ExpandableDialogDescription>
                            {DESCRICAO}
                        </ExpandableDialogDescription>
                    </div>
                </ExpandableDialogHeader>
                <ExpandableDialogBody>{content}</ExpandableDialogBody>
            </ExpandableDialogContent>
        </ExpandableDialog>
    );
}
