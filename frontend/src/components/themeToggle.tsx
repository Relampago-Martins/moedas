'use client';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from '../shared/ui/switch';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [rendering, setRendering] = useState(true);

    useEffect(() => {
        setRendering(false);
    }, []);

    if (rendering) return null;

    return (
        <div className="flex flex-row items-center gap-3">
            <SunIcon className="h-4 w-4 transition-all" />
            <Switch
                checked={theme === 'dark'}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
            <MoonIcon className="h-4 w-4 transition-all" />
        </div>
    );
}
