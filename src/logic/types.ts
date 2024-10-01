export type {
    Digit,
    DecimalDot,
    Operator,
    ValidInput,
    CalculatorState,
}

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type DecimalDot = ".";
type Operator = "+" | "-" | "*" | "/";
type ControlCharacter = "=" | "C"

type ValidInput = Digit | DecimalDot | Operator | ControlCharacter

type CalculatorStage = "initial" | "valueInput" | "operatorSelected"  | "result" | "error"
interface BaseCalculatorState {
    inputStage: CalculatorStage;
    currentValue: string;
    previousValue: string | null;
    hiddenOperand: string | null; // allows repeating last operation even though currentValue was changed
    activeOperator: Operator | null;
    // result: string | null;
}
type CalculatorState = BaseCalculatorState & (
    {
        inputStage: "initial",
        currentValue: "0",
        previousValue: null,
        activeOperator: null,
        // result: null
    } | {
        inputStage: "valueInput",
        // activeOperator: null,
        // result: null
    } | {
        inputStage: "operatorSelected",
        activeOperator: Operator,
        // result: null
    // } | {
    //     inputStage: "valueInput"
    //     activeOperator: Operator,
    //     // result: null
    } | {
        inputStage: "result",
        previousValue: null,
        // activeOperator: Operator,
        // result: string,
    } | {
        inputStage: "error",
    }
)