import { Box, Text } from "@radix-ui/themes";
import { MAX_DIGITS } from "../logic/globals";

interface CalculatorDisplayProps {
    value: string;
}

export function CalculatorDisplay({
    value
}: CalculatorDisplayProps) {
    return (
        <Box p="1" asChild className="calculator-display" width={`${MAX_DIGITS + 2.5}ch`}>
            <Text size="6" align="right" className="text-monospace">
                {value}
            </Text>
        </Box>
    );
}
