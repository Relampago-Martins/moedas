import { CardBalanco } from "@/features/card-balanco/ui";
import { CardSaldo } from "@/features/card-saldo/ui";
import { SideBar } from "@/features/side-bar/ui";
import { OuterProvider, OuterTrigger } from "@/features/side-bar/ui/NavBar";
import { loginIsRequiredServer } from "@/shared/lib/auth";
import { FaBars } from "react-icons/fa6";


export default async function Dashboard() {
    await loginIsRequiredServer()

    return (
        <main className="min-h-screen flex flex-row h-full bg-background">
            <OuterProvider>
                <SideBar/>
                <div className="flex flex-col">
                    <div 
                        className="flex items-center gap-2 md:hidden pt-2 px-7 text-primary">
                        <OuterTrigger className="hover:cursor-pointer">
                            <FaBars className="text-lg"/>
                        </OuterTrigger>
                        <span className="text-lg font-semibold">Moedas</span>
                    </div>
                    <div className="flex flex-wrap flex-row gap-6 p-6 pt-2">
                        <CardSaldo/>
                        {/* <CardContas/> */}
                    </div>
                    <div className="flex flex-wrap flex-row gap-6 p-6 pt-2">
                        <CardBalanco/>
                    </div>
                </div>
            </OuterProvider>
        </main>
    )
}

export const metadata = {
    title: 'Moedas Dashboard',
}