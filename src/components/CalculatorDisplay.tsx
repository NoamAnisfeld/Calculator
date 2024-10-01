import { Box, Text } from "@radix-ui/themes";

interface CalculatorDisplayProps {
    value: string;
}

export function CalculatorDisplay({
    value
}: CalculatorDisplayProps) {
    return (
        <Box p="1" asChild className="calculator-display">
            <Text size="6" align="right" className="text-monospace">
                {value}
            </Text>
        </Box>
    );
}
