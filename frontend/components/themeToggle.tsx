'use client';
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "../shared/ui/switch";


export default function ThemeToggle() {
    const {theme, setTheme } = useTheme();
 
    return (
        <div className="flex flex-row gap-3 items-center">
            <SunIcon className="h-4 w-4 transition-all" />
            <Switch 
                checked={theme === "dark"}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
            />
            <MoonIcon className="h-4 w-4 transition-all" />
        </div>
    )
} 