import { Box, Text } from "@radix-ui/themes";
import { MAX_DIGITS } from "../logic/globals";

interface CalculatorDisplayProps {
    value: string,
    activeOperator: string;
}

export function CalculatorDisplay({
    value,
    activeOperator,
}: CalculatorDisplayProps) {
    return (
        <Box px="1" className="calculator-display">
            <>
                <Box px="2" height="1em" asChild>
                    <Text size="2" align="right">
                        {activeOperator}
                    </Text>
                </Box>
                <Box pb="1" asChild width={`${MAX_DIGITS + 2.5}ch`}>
                    <Text size="6" align="right" className="text-monospace">
                        {value}
                    </Text>
                </Box>
            </>
        </Box>
    );
}
