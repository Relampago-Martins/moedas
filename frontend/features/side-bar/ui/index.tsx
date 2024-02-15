'client side';
import { Separator } from "@/shared/ui/separator";
import { BsFlagFill, BsGrid1X2Fill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { GiCash } from "react-icons/gi";
import { NavBar, NavBarContent, NavBarFooter, NavBarHeader, NavBarItem, NavBarTrigger } from "./NavBar";
import { UserMenu } from "./UserMenu";

export function SideBar(){
    return (
        <NavBar transitionDuration={600}>
            <NavBarHeader>
                <NavBarTrigger className="text-lg font-semibold"
                    icon={<div>M</div>}>
                    Moedas
                </NavBarTrigger>
            </NavBarHeader>
            <Separator className="w-[80%] self-center"/>
            <NavBarContent>
                <NavBarItem icon={ <FaPlus className="h-4 w-4"/> }>
                    Add transferência
                </NavBarItem>
                <NavBarItem icon={ <BsGrid1X2Fill className="h-4 w-4"/> }>
                    Início
                </NavBarItem>
                <NavBarItem icon={ <BsFlagFill className="h-4 w-4"/> }>
                    Progresso
                </NavBarItem>
                <NavBarItem icon={ <GiCash className="h-5 w-5"/> }>
                    Patrimônio
                </NavBarItem>
            </NavBarContent>
            <NavBarFooter>
                <UserMenu/>
            </NavBarFooter>
        </NavBar>
    )
}