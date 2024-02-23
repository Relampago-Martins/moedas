'client side';
import { Separator } from "@/shared/ui/separator";
import { BsFlagFill, BsGrid1X2Fill } from "react-icons/bs";
import { FaArrowRightArrowLeft, FaBars, FaGear, FaPlus } from "react-icons/fa6";
import { GiCash } from "react-icons/gi";
import { NavBar, NavBarContent, NavBarFooter, NavBarHeader, NavBarItem, NavBarTrigger } from "./NavBar";
import { Notification } from "./Notification";
import { UserMenu } from "./UserMenu";

export function SideBar(){
    return (
        <NavBar transitionDuration={600}>
            <NavBarHeader>
                <NavBarTrigger className="text-lg font-bold text-primary select-none opacity-90"
                    icon={<div className="bg-input px-2 rounded-lg">M</div>}>
                    <span className="w-full">Moedas</span>
                    <FaBars className="text-lg"/>
                </NavBarTrigger>
            </NavBarHeader>
            <Separator className="self-center w-[85%]"/>
            <NavBarContent>
                <NavBarItem
                    icon={<FaPlus className="text-sm"/> }>
                    Novo
                </NavBarItem>
                <NavBarItem
                    active
                    icon={ <BsGrid1X2Fill className="text-sm"/> }>
                    Início
                </NavBarItem>
                <NavBarItem icon={ <BsFlagFill className="text-sm"/> }>
                    Progresso
                </NavBarItem>
                <NavBarItem icon={ <GiCash className="text-lg"/> }>
                    Patrimônio
                </NavBarItem>
                <NavBarItem
                    icon={ <FaArrowRightArrowLeft  className="text-sm"/> }
                    suffix={<Notification>6</Notification>}>
                    Transferências
                </NavBarItem>
                <NavBarItem
                    icon={ <FaGear  className="text-sm"/> }>
                    Configurações
                </NavBarItem>
            </NavBarContent>
            <NavBarFooter>
                <UserMenu/>
            </NavBarFooter>
        </NavBar>
    )
}