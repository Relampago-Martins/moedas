import { Money } from "@/components/money-card";
import { Transactions } from "@/components/transactions-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserBox } from "@/components/user-box";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Dashboard() {
    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex px-6 py-3 items-center justify-between border-b">
                <div className="flex items-center gap-3">
                    <div className="text-xl text-violet-400">
                        Moedas
                    </div>
                    <Separator orientation="vertical" className="h-6 bg-muted-foreground"/>
                    <span className="text-sm text-muted-foreground">
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
            <div className="flex-1 p-6 bg-primary">
                <div className="flex flex-wrap flex-row gap-6">
                    <Money/>
                    <Transactions/>
                </div>
            </div>
        </main>
    )
}

export const metadata = {
    title: 'Moedas Dashboard',
}