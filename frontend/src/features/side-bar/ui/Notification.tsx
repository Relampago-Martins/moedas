import { ReactNode } from 'react';

type NotificationProps = {
    children: ReactNode;
    className?: string;
};

export function Notification({ children, className }: NotificationProps) {
    return (
        <div
            className={`rounded-full bg-primary px-[.5rem] text-[0.625rem]
            text-primary-foreground shadow-sm ${className}`}
        >
            {children}
        </div>
    );
}
