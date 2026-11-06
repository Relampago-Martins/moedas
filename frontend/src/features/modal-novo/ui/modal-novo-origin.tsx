'use client';
import { ExpandableDialogOrigin } from '@/shared/ui/custom/expandable-dialog';
import { useModalNovoStore } from '../lib/modal-novo-store';

type ModalNovoOriginProps = {
    /** Único entre os botões que abrem o modal Novo. */
    id: string;
    className?: string;
    /** Raio do botão, em pixels. */
    radius?: number;
};

/**
 * Marca o botão de onde o modal Novo sai no desktop. Vai dentro do botão, que
 * precisa ser `relative`, e o botão abre o modal com `abrir(id)`.
 */
export function ModalNovoOrigin({
    id,
    className,
    radius,
}: ModalNovoOriginProps) {
    const open = useModalNovoStore(
        (state) => state.isOpen && state.origemId === id,
    );

    return (
        <ExpandableDialogOrigin
            id={id}
            open={open}
            radius={radius}
            className={className}
        />
    );
}
