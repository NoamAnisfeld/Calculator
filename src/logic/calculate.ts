import type { Operator } from "./types";
import { MAX_DIGITS } from "./globals";
import { toRoundedString, wholeDigits } from "./utils";

export function calculateResultWithLimitedDigits(operand1: string, operand2: string, operator: Operator): string {
    const a = Number(operand1);
    const b = Number(operand2);

    if (isNaN(a) || isNaN(b)) {
        throw new Error("Invalid input");
    }

    if (b === 0 && operator === "/") {
        throw new Error("Division by zero");
    }

    const intermediateResult = {
        "+": a + b,
        "-": a - b,
        "*": a * b,
        "/": a / b,
    }[operator];

    if (isNaN(intermediateResult)) {
        throw new Error("Unexpected error");
    }

    if (wholeDigits(intermediateResult) > MAX_DIGITS) {
        throw new Error("Result too large");
    }

    return toRoundedString(intermediateResult);
}
