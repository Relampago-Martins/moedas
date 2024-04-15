import { ReactNode } from "react"

type NotificationProps = {
    children: ReactNode,
    className?: string
}

export function Notification({children, className}: NotificationProps){
    return (
        <div className={`text-[0.625rem] bg-violet-500 text-primary-foreground
            px-[.5rem] rounded-full ${className}`}>
            {children}
        </div>
    )
}