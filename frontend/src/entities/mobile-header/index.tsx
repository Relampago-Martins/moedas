import { NavBarOuterTrigger } from '@/features/side-bar/ui/NavBar';
import { Menu } from 'lucide-react';

export function MobileHeader() {
    return (
        <div className="flex flex-row justify-between border-b border-gray-200 px-7 py-2 text-primary md:hidden">
            <NavBarOuterTrigger className="flex items-center gap-4 hover:cursor-pointer">
                <Menu className="h-5 w-5" />
                <span className="text-lg font-semibold">Prosper</span>
            </NavBarOuterTrigger>
        </div>
    );
}
