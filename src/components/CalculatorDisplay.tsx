interface CalculatorDisplayProps {
    value: string;
}

export function CalculatorDisplay({
    value
}: CalculatorDisplayProps) {
    return (
        <div>
            <span>{value}</span>
        </div>
    );
}
