import { NavBarOuterTrigger } from '@/features/side-bar/ui/NavBar';
import { Menu } from 'lucide-react';

export function MobileHeader() {
    return (
        <div className="sticky flex flex-row justify-between border-b border-border px-7 py-2 text-primary shadow-sm md:hidden">
            <NavBarOuterTrigger className="flex items-center gap-4 hover:cursor-pointer">
                <Menu className="h-5 w-5" />
                <span className="text-lg font-semibold">Prosper</span>
            </NavBarOuterTrigger>
        </div>
    );
}
