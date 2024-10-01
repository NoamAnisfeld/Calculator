import { useState } from "react";
import { CalculatorButtons } from "./CalculatorButtons";
import { CalculatorContainer } from "./CalculatorContainer";
import { CalculatorDisplay } from "./CalculatorDisplay";
import { ValidInput } from "../logic/types";

export function CalculatorWidget() {

    const [currentValue, setCurrentValue] = useState("0");

    function handleInput(input: ValidInput) {
        setCurrentValue(oldValue => oldValue + input);
    }

    return (
        <CalculatorContainer>
            <CalculatorDisplay value={currentValue} />
            <CalculatorButtons onButtonClicked={handleInput} />
        </CalculatorContainer>
    );
}