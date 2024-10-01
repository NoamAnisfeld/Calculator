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
}
type CalculatorState = BaseCalculatorState & (
    {
        inputStage: "initial",
        currentValue: "0",
        previousValue: null,
        activeOperator: null,
    } | {
        inputStage: "valueInput",
    } | {
        inputStage: "operatorSelected",
        activeOperator: Operator,
    } | {
        inputStage: "result",
        previousValue: null,
    } | {
        inputStage: "error",
    }
)