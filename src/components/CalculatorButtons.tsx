import { ValidInput } from "../types/types";

type CalculatorButtonsProps = {
    onButtonClicked: (input: ValidInput) => void;
}

export function CalculatorButtons({
    onButtonClicked
}: CalculatorButtonsProps) {

    const values: ValidInput[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "=", "C"];

    return (<>
        {values.map(value =>
            <button
                key={value}
                onClick={() => onButtonClicked(value)}
            >
                {value}
            </button>
        )}
    </>);
}