import { NavBarOuterTrigger } from '@/features/side-bar/ui/NavBar';
import { FaBars } from 'react-icons/fa6';

export function MobileHeader() {
    return (
        <div className="flex flex-row justify-between border-b border-gray-200 px-7 py-2 text-primary md:hidden">
            <NavBarOuterTrigger className="flex items-center gap-4 hover:cursor-pointer">
                <FaBars className="text-lg" />
                <span className="text-lg font-semibold">ProsperApp</span>
            </NavBarOuterTrigger>
        </div>
    );
}
