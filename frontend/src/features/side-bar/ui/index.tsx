import { Separator } from '@/shared/ui/separator';
import Link from 'next/link';
import { BsFlagFill, BsGrid1X2Fill, BsSafe2Fill } from 'react-icons/bs';
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
                <NovoBtn />

                <NavBarItem
                    component={<Link href="/dashboard" />}
                    activeName="/dashboard"
                    icon={<BsGrid1X2Fill className="text-sm" />}
                >
                    Início
                </NavBarItem>
                <NavBarItem icon={<BsFlagFill className="text-sm" />}>
                    Progresso
                </NavBarItem>
                <NavBarItem icon={<BsSafe2Fill className="text-lg" />}>
                    Patrimônio
                </NavBarItem>
                <NavBarItem
                    icon={<FaArrowRightArrowLeft className="text-sm" />}
                    suffix={<Notification>6</Notification>}
                >
                    Transferências
                </NavBarItem>
                <NavBarItem
                    activeName="/playground"
                    icon={<FaBoltLightning className="text-sm" />}
                    component={<Link href="/playground" />}
                >
                    PlayGround
                </NavBarItem>
                <NavBarItem icon={<FaGear className="text-sm" />}>
                    Configurações
                </NavBarItem>
            </NavBarContent>
            <NavBarFooter>
                <UserMenu />
            </NavBarFooter>
        </NavBar>
    );
}
