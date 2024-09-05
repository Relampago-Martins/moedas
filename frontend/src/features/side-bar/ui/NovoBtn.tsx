'use client';

import { useModalNovoStore } from '@/features/modal-novo/lib/modal-novo-store';
import { FaPlus } from 'react-icons/fa6';
import { NavBarItem } from './NavBar';

export function NovoBtn() {
    const abrirModal = useModalNovoStore((state) => {
        return () => state.onOpenChange(true);
    });

    return (
        <NavBarItem
            icon={<FaPlus className="text-sm" />}
            onClick={() => {
                abrirModal();
            }}
        >
            Novo
        </NavBarItem>
    );
}
