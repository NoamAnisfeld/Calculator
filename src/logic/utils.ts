import type { Digit, DecimalDot } from "./types";
import { MAX_DIGITS } from "./globals";

export {
    extendValueWithDigitsLimit,
    wholeDigits,
    toRoundedString,
}

function extendValueWithDigitsLimit(operand: string, input: Digit | DecimalDot): string {

    if (operand.replace(/[.-]/g, "").length >= MAX_DIGITS) {
        return operand;
    }

    if (operand.replace(/[.-]/g, "").length === MAX_DIGITS && input === ".") {
        return operand;
    }

    if (input === ".") {
        return operand.includes(".") ? operand : operand + input;
    }

    if (operand === "0") {
        return input;
    }

    if (operand === "-0") {
        return `-${input}`;
    }

    return operand + input;
}

function wholeDigits(n: number): number {
    return String(Math.abs(Math.trunc(n))).length;
}

function toRoundedString(n: number): string {
    const spaceForFrictionDigits = MAX_DIGITS - wholeDigits(n);
    const toFixed = n.toFixed(spaceForFrictionDigits);
    return trimTrailingZeros(toFixed);
}

function trimTrailingZeros(stringNum: string): string {
    return stringNum.includes(".")
        ? stringNum.replace(/\.?0+$/, "")
        : stringNum;
}