type ReadableTextColorDivProps = {
    color: string;
    className?: string;
    children: React.ReactNode;
};

export function ReadableTextColorDiv({
    color,
    children,
    className,
}: ReadableTextColorDivProps) {
    return (
        <div className="relative w-full">
            <div
                className={className}
                style={{
                    color: color,
                }}
            >
                {children}
            </div>
            <div
                className={`${className} absolute inset-0 text-black opacity-30 dark:text-white`}
            >
                {children}
            </div>
        </div>
    );
}
