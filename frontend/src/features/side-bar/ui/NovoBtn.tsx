'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { OuterNavBarContext } from '../lib/context';
import { NavBarItem } from './NavBar';

export function NovoBtn() {
    const { setToggled } = useContext(OuterNavBarContext);
    const router = useRouter();
    return (
        <NavBarItem
            icon={<FaPlus className="text-sm" />}
            onClick={() => {
                setToggled?.(false);
                router.push('/dashboard/novo');
            }}
        >
            Novo
        </NavBarItem>
    );
}
