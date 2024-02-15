import { UserMenu } from "@/features/side-bar/ui/UserMenu";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function TopBar(){
    return (
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
                <UserMenu/>       
            </div>
        </div>
    )
}