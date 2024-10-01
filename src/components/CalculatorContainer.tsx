import { Box, Card, Flex } from "@radix-ui/themes";

export function CalculatorContainer({ children }: { children: React.ReactNode; }) {
    return (
        <Box>
            <Card className="calculator-container">
                <Flex direction="column" gap="2">
                    {children}
                </Flex>
            </Card>
        </Box>
    );
}
