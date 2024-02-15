import { CardSaldo } from "@/features/card-saldo/ui";
import { SideBar } from "@/features/side-bar/ui";
import { OuterProvider, OuterTrigger } from "@/features/side-bar/ui/NavBar";
import { loginIsRequiredServer } from "@/shared/lib/auth";

export default async function Dashboard() {
    await loginIsRequiredServer()

    return (
        <main className="min-h-screen flex flex-row h-full">
            <OuterProvider>
                <SideBar/>
                <div className="flex flex-col">
                    <OuterTrigger
                        className="sm:hidden block pt-2 pl-7 text-lg font-semibold hover:cursor-pointer">
                            Moedas
                    </OuterTrigger>
                    <div className="flex flex-wrap flex-row flex-1 gap-6 p-6 pt-2 bg-background">
                            {/* <CardCarteira/> */}
                            <CardSaldo/>
                            {/* <TabelaTransacoes/> */}
                            {/* <TesteLogin/> */}
                    </div>
                </div>
            </OuterProvider>
        </main>
    )
}

export const metadata = {
    title: 'Moedas Dashboard',
}