export function DiferencaSaldoBadge({
    diffPercentual,
}: {
    diffPercentual: number;
}) {
    const evoluiuPatrimonio = diffPercentual > 0;
    const mantevePatrimonio = diffPercentual === 0;

    return (
        <div
            className="flex w-fit items-center gap-1 rounded-md px-1"
            style={{
                color: evoluiuPatrimonio
                    ? 'var(--success-foreground)'
                    : mantevePatrimonio
                      ? 'var(--muted)'
                      : 'var(--destructive-foreground)',
                backgroundColor: evoluiuPatrimonio
                    ? 'var(--success)'
                    : mantevePatrimonio
                      ? 'var(--muted-foreground)'
                      : 'var(--destructive)',
            }}
        >
            {evoluiuPatrimonio ? (
                <i className="ph ph-arrow-up flex text-sm"></i>
            ) : mantevePatrimonio ? (
                <i className="ph ph-equals flex text-sm"></i>
            ) : (
                <i className="ph ph-arrow-down flex text-sm"></i>
            )}
            <span className="text-sm">
                {diffPercentual.toFixed(0).replace('.', ',').replace('-', '')}%
            </span>
        </div>
    );
}
