import { UserBox } from "@/components/user-box";
import { CardSaldo } from "@/features/card-saldo/ui";
import { loginIsRequiredServer } from "@/shared/lib/auth";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default async function Dashboard() {
    await loginIsRequiredServer()

    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex px-6 py-3 items-center justify-between border-b bg-primary dark:bg-transparent">
                <div className="flex items-center gap-3">
                    <div className="text-xl text-secondary font-semibold">
                        Moedas
                    </div>
                    <Separator orientation="vertical" className="h-6 bg-secondary"/>
                    <span className="text-sm text-secondary">
                        Conheça o seu dinheiro
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <Button asChild variant="outline"  size="icon">
                        <a target="_blank" href="https://github.com/Relampago-Martins">
                            <GitHubLogoIcon className="h-4 w-4" />
                        </a>
                    </Button>
                    <UserBox/>       
                </div>
            </div>
            <div className="flex-1 p-6 bg-background">
                <div className="flex flex-wrap flex-row gap-6">
                    {/* <CardCarteira/> */}
                    <CardSaldo/>
                    {/* <TabelaTransacoes/> */}
                    {/* <TesteLogin/> */}
                </div>
            </div>
        </main>
    )
}

export const metadata = {
    title: 'Moedas Dashboard',
}