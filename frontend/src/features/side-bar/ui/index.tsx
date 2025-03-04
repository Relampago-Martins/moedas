import { Logo } from '@/shared/ui/custom/logo';
import { ChartUpIcon, LeftToRightListDashIcon } from '@/shared/ui/huge-icons';
import { Separator } from '@/shared/ui/separator';
import { MotionConfig } from 'framer-motion';
import { Blocks, House, Menu, Settings } from 'lucide-react';
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
                        icon={<House className="ml-1 h-4 w-4" />}
                    >
                        Início
                    </NavBarItem>
                    <NavBarItem
                        icon={
                            <LeftToRightListDashIcon className="ml-1 h-4 w-4" />
                        }
                        component={<Link href="/movimentacoes" />}
                        activeName="/movimentacoes"
                    >
                        Movimentações
                    </NavBarItem>
                    <NavBarItem
                        activeName="/plano-financeiro"
                        icon={<ChartUpIcon className="ml-1 h-4 w-4" />}
                        component={<Link href="/plano-financeiro" />}
                    >
                        Plano financeiro
                    </NavBarItem>
                    <NavBarItem
                        icon={<Blocks className="ml-1 h-4 w-4" />}
                        component={<Link href="/playground" />}
                        activeName="/playground"
                    >
                        PlayGround
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
