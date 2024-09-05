import { Separator } from '@/shared/ui/separator';
import { MotionConfig } from 'framer-motion';
import Link from 'next/link';
import { BsFlagFill, BsGrid1X2Fill } from 'react-icons/bs';
import {
    FaArrowRightArrowLeft,
    FaBars,
    FaBoltLightning,
    FaGear,
} from 'react-icons/fa6';
import {
    NavBar,
    NavBarContent,
    NavBarFooter,
    NavBarHeader,
    NavBarItem,
    NavBarTrigger,
} from './NavBar';
import { Notification } from './Notification';
import { NovoBtn } from './NovoBtn';
import { UserMenu } from './UserMenu';

export function SideBar() {
    return (
        <NavBar transitionDuration={600}>
            <NavBarHeader>
                <NavBarTrigger
                    className="select-none text-lg font-bold text-primary opacity-90"
                    icon={<div className="rounded-lg bg-input px-2">P</div>}
                >
                    <span className={`w-full`}>ProsperApp</span>
                    <FaBars className="hidden text-lg md:block" />
                </NavBarTrigger>
            </NavBarHeader>
            <Separator className="w-[85%] self-center" />
            <NavBarContent>
                <MotionConfig>
                    <NovoBtn />

                    <NavBarItem
                        component={<Link href="/dashboard" />}
                        activeName="/dashboard"
                        icon={<BsGrid1X2Fill className="text-sm" />}
                    >
                        Início
                    </NavBarItem>
                    <NavBarItem
                        icon={<FaArrowRightArrowLeft className="text-sm" />}
                        suffix={<Notification>6</Notification>}
                        component={<Link href="/movimentacoes" />}
                        activeName="/movimentacoes"
                    >
                        Movimentações
                    </NavBarItem>
                    <NavBarItem
                        activeName="/plano-financeiro"
                        icon={<BsFlagFill className="text-sm" />}
                        component={<Link href="/plano-financeiro" />}
                    >
                        Plano financeiro
                    </NavBarItem>
                    <NavBarItem
                        icon={<FaBoltLightning className="text-sm" />}
                        component={<Link href="/playground" />}
                        activeName="/playground"
                    >
                        PlayGround
                    </NavBarItem>
                    <NavBarItem
                        icon={<FaGear className="text-sm" />}
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
