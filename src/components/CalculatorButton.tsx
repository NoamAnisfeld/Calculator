import { useEffect } from "react";
import { Button } from "@radix-ui/themes";
import { ValidInput } from "../logic/types";

interface CalculatorButtonProps {
    value: ValidInput;
    clickHandler: (value: ValidInput) => void;
    keyboardKeys: string[];
    gridArea: string;
    children: React.ReactNode;
}

export default function CalculatorButton({
    value,
    clickHandler,
    keyboardKeys,
    gridArea,
    children,
}: CalculatorButtonProps) {

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (
                keyboardKeys.includes(event.key)
                && !event.ctrlKey
                && !event.altKey
                && !event.metaKey
            ) {
                clickHandler(value);
            }
        }
        window.addEventListener("keyup", listener);

        return () => {
            window.removeEventListener("keyup", listener);
        }
    }, [keyboardKeys, clickHandler, value]);

    return (
        <Button
            key={value}
            onClick={() => clickHandler(value)}
            style={{ gridArea }}
        >
            {children}
        </Button>
    );
}
