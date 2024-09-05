'use client';

import { useModalNovoStore } from '@/features/modal-novo/lib/modal-novo-store';
import { useContext } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { OuterNavBarContext } from '../lib/context';
import { NavBarItem } from './NavBar';

export function NovoBtn() {
    const { setToggled } = useContext(OuterNavBarContext);
    const abrirModal = useModalNovoStore((state) => {
        return () => state.onOpenChange(true);
    });

    return (
        <NavBarItem
            icon={<FaPlus className="text-sm" />}
            onClick={() => {
                setToggled?.(false);
                abrirModal();
            }}
        >
            Novo
        </NavBarItem>
    );
}
