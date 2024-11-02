import { NavBarOuterTrigger } from '@/features/side-bar/ui/NavBar';
import { Logo } from '@/shared/ui/custom/log';
import { Menu } from 'lucide-react';

export function MobileHeader() {
    return (
        <div className="sticky flex flex-row justify-between border-b border-border px-6 py-2 text-primary shadow-sm md:hidden md:px-8">
            <NavBarOuterTrigger className="flex items-center gap-4 hover:cursor-pointer">
                <Menu className="h-5 w-5" />
                <span className="text-lg font-semibold">
                    <Logo comNome className="h-6 object-contain object-left" />
                </span>
            </NavBarOuterTrigger>
        </div>
    );
}
