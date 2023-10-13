import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/theme-button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Home() {
    return (
        <main>
            <div className="flex px-6 py-3 items-center justify-between border-b">
                <div className="flex items-center gap-3">
                    <div className="text-xl text-primary">
                        MyFinance
                    </div>
                    <Separator orientation="vertical" className="h-6 bg-muted-foreground"/>
                    <span className="text-sm text-muted-foreground">
                        Track your money and your life
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <Button asChild variant="outline"  size="icon">
                        <a target="_blank" href="https://github.com/Relampago-Martins">
                            <GitHubLogoIcon className="h-4 w-4" />
                        </a>
                    </Button>
                    <ModeToggle/>
                </div>
            </div>
        </main>
    )
}