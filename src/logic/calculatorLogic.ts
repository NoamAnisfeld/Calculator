import type { ValidInput, CalculatorState } from "./types";
import { extendValueWithDigitsLimit } from "./utils";
import { calculateResultWithLimitedDigits } from "./calculate";

export {
    initialState,
    processInput,
}

function initialState(): CalculatorState & { inputStage: "initial" } {
    return {
        inputStage: "initial",
        currentValue: "0",
        previousValue: null,
        hiddenOperand: null,
        activeOperator: null,
        // result: null
    }
}

function errorState(): CalculatorState {
    return {
        ...initialState(),
        inputStage: "error",
    }
}

function processInput(state: CalculatorState, input: ValidInput): CalculatorState {
    try {
        switch (state.inputStage) {
            case "initial":
                return processInitialInput(state, input);
            case "valueInput":
                return processValueInput(state, input);
            case "operatorSelected":
                return processInputAfterOperator(state, input);
            case "result":
                return processInputAfterResult(state, input);
            case "error":
                return processInputAfterError(state, input);
        }
    } catch (e) {
        console.error(e);
        return errorState();
    }
}

function processInitialInput(state: CalculatorState & { inputStage: "initial" }, input: ValidInput): CalculatorState {
    switch (input) {
        case "C":
            return initialState();
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
            return {
                ...state,
                currentValue: extendValueWithDigitsLimit(state.currentValue, input),
                inputStage: "valueInput",
            }
        case "-":
            return {
                ...state,
                currentValue: "-0",
                inputStage: "valueInput",
            }
        case "+":
        case "*":
        case "/":
            return {
                ...state,
                currentValue: state.currentValue,
                activeOperator: input,
                inputStage: "operatorSelected",
            }
        case "=":
            return state;
    }
}

function processValueInput(state: CalculatorState & { inputStage: "valueInput" }, input: ValidInput): CalculatorState {
    switch (input) {
        case "C":
            return initialState();
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
            return {
                ...state,
                currentValue: extendValueWithDigitsLimit(state.currentValue, input),
            }
        case "+":
        case "-":
        case "*":
        case "/":
            return {
                ...state,
                activeOperator: input,
                inputStage: "operatorSelected",
            }
        case "=":
            return (state.previousValue && state.activeOperator
                ? {
                    ...state,
                    previousValue: null,
                    hiddenOperand: state.currentValue,
                    currentValue: calculateResultWithLimitedDigits(
                        state.previousValue, state.currentValue, state.activeOperator
                    ),
                    inputStage: "result",
                }
                : {
                    ...state,
                    previousValue: null,
                    inputStage: "result",
                }
            )
    }
}

function processInputAfterOperator(state: CalculatorState & { inputStage: "operatorSelected" }, input: ValidInput): CalculatorState {
    switch (input) {
        case "C":
            return initialState();
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            return {
                ...state,
                previousValue: state.currentValue,
                currentValue: input,
                inputStage: "valueInput",
            }
        case ".":
            return {
                ...state,
                previousValue: state.currentValue,
                currentValue: "0.",
                inputStage: "valueInput",
            }
        case "-":
            return {
                ...state,
                previousValue: state.currentValue,
                currentValue: "-0",
                inputStage: "valueInput",
            }
        case "+":
        case "*":
        case "/":
            return {
                ...state,
                activeOperator: input,
            }
        case "=":
            return {
                ...state,
                previousValue: null,
                activeOperator: null,
                inputStage: "result",
            }
    }
}

// function processSecondOperandInput(state: CalculatorState & { inputStage: "valueInput" }, input: ValidInput): CalculatorState {
//     switch (input) {
//         case "C":
//             return initialState();
//         case "0":
//         case "1":
//         case "2":
//         case "3":
//         case "4":
//         case "5":
//         case "6":
//         case "7":
//         case "8":
//         case "9":
//             return {
//                 ...state,
//                 currentValue: extendValueWithDigitsLimit(state.currentValue, input),
//             }
//         case ".":
//             return {
//                 ...state,
//                 currentValue: state.currentValue.includes(".") ? state.currentValue : state.currentValue + ".",
//             }
//         case "=":
//             return {
//                 ...state,
//                 result: calculateResultWithLimitedDigits(state),
//                 inputStage: "result",
//             }
//         case "+":
//         case "-":
//         case "*":
//         case "/":
//             return {
//                 ...initialState(),
//                 previousValue: calculateResultWithLimitedDigits(state),
//                 activeOperator: input,
//                 inputStage: "operatorSelected",
//             }
//     }
// }

function processInputAfterResult(state: CalculatorState & { inputStage: "result" }, input: ValidInput): CalculatorState {
    switch (input) {
        case "C":
            return initialState();
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
            return processInitialInput(initialState(), input);
        case "+":
        case "-":
        case "*":
        case "/":
            return {
                ...initialState(),
                activeOperator: input,
                inputStage: "operatorSelected",
            }
        case "=":
            // when "=" is pressed sequntially, repeat last operation
            return (state.hiddenOperand && state.activeOperator
                ? {
                    ...state,
                    currentValue: calculateResultWithLimitedDigits(
                        state.hiddenOperand, state.currentValue, state.activeOperator
                    ),
                    inputStage: "result",
                }
                : state
            )
    }
}

function processInputAfterError(state: CalculatorState & { inputStage: "error" }, input: ValidInput): CalculatorState {
    switch (input) {
        case "C":
            return initialState();
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
        case "-":
            return processInitialInput(initialState(), input);
        case "+":
        case "*":
        case "/":
        case "=":
            return state;
    }
}