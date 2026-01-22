import { Logo } from '@/shared/ui/custom/logo';
import { Separator } from '@/shared/ui/separator';
import { MotionConfig } from 'framer-motion';
import { Menu, Settings } from 'lucide-react';
import Link from 'next/link';
import {
    NavBar,
    NavBarContent,
    NavBarFooter,
    NavBarHeader,
    NavBarItem,
    NavBarTrigger,
} from './NavBar';
import { NovoBtn } from './NovoBtn';
import { UserMenu } from './UserMenu';

export function SideBar() {
    return (
        <NavBar transitionDuration={600}>
            <NavBarHeader>
                <NavBarTrigger
                    className="select-none text-lg font-bold text-primary"
                    icon={<Logo />}
                >
                    <span className={`w-full`}>
                        <Logo comNome />
                    </span>
                    <Menu className="hidden h-6 w-6 md:block" />
                </NavBarTrigger>
            </NavBarHeader>
            <Separator className="w-[85%] self-center" />
            <NavBarContent>
                <MotionConfig>
                    <NovoBtn />

                    <NavBarItem
                        component={<Link href="/dashboard" />}
                        activeName="/dashboard"
                        icon={<i className="ph ph ph-house ml-1 text-xl" />}
                    >
                        Início
                    </NavBarItem>
                    <NavBarItem
                        icon={
                            <i className="ph ph-arrows-down-up ml-1 flex text-xl"></i>
                        }
                        component={<Link href="/movimentacoes" />}
                        activeName="/movimentacoes"
                    >
                        Movimentações
                    </NavBarItem>
                    <NavBarItem
                        activeName="/orcamento"
                        icon={
                            <i className="ph ph-crosshair ml-1 flex text-xl" />
                        }
                        component={<Link href="/orcamento" />}
                    >
                        Orçamento
                    </NavBarItem>
                    <NavBarItem
                        icon={
                            <i className="ph ph-hand-coins ml-1 flex text-xl" />
                        }
                        component={<Link href="/patrimonio" />}
                        activeName="/patrimonio"
                    >
                        Patrimônio
                    </NavBarItem>
                    <NavBarItem
                        icon={<Settings className="ml-1 h-4 w-4" />}
                        component={<Link href="/configuracoes" />}
                        activeName="/configuracoes"
                    >
                        Configurações
                    </NavBarItem>
                </MotionConfig>
            </NavBarContent>
            <NavBarFooter>
                <UserMenu />
            </NavBarFooter>
        </NavBar>
    );
}
