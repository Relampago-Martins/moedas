'use client';

import { useModalNovoStore } from '@/features/modal-novo/lib/modal-novo-store';
import { Plus } from 'lucide-react';
import { NavBarItem } from './NavBar';

export function NovoBtn() {
    const abrirModal = useModalNovoStore((state) => {
        return () => state.onOpenChange(true);
    });

    return (
        <NavBarItem
            icon={<Plus className="h-4 w-4" />}
            onClick={() => {
                abrirModal();
            }}
        >
            Novo
        </NavBarItem>
    );
}
