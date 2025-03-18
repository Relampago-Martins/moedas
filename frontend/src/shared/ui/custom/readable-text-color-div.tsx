type ReadableTextColorDivProps = {
    color: string;
    className?: string;
    children: React.ReactNode;
    outerClassName?: string;
};

export function ReadableTextColorDiv({
    color,
    children,
    className,
    outerClassName,
}: ReadableTextColorDivProps) {
    return (
        <div className={`relative w-full ${outerClassName}`}>
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
