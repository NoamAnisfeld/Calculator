import { useState } from "react";
import { CalculatorButtons } from "./CalculatorButtons";
import { CalculatorContainer } from "./CalculatorContainer";
import { CalculatorDisplay } from "./CalculatorDisplay";
import { CalculatorState, ValidInput } from "../logic/types";
import { initialState, processInput } from "../logic/calculatorLogic";

export function CalculatorWidget() {

    const [calculatorState, setCalculatorState] = useState<CalculatorState>(initialState());

    function handleInput(input: ValidInput) {
        setCalculatorState(processInput(calculatorState, input));
    }

    return (
        <CalculatorContainer>
            <CalculatorDisplay value={
                calculatorState.inputStage !== "error"
                    ? calculatorState.currentValue
                    : "Error"
                }
            />
            <CalculatorButtons onButtonClicked={handleInput} />
        </CalculatorContainer>
    );
}