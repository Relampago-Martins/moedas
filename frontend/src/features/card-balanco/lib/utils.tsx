export function getColor(percentual: number) {
    if (percentual >= 70) {
        return '#16a34a'; // green-600
    }
    if (percentual >= 25) {
        return '#fbbf24'; // amber-400
    }
    return '#e11d48'; // rose-600
}
