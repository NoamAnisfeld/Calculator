import { describe, expect, it, test } from "vitest";
import { initialState, processInput } from "./calculatorLogic";
import { CalculatorState, ValidInput } from "./types";

describe("correct initial state", () => {
    it("returns correct initial state", () => {
        const state = initialState();
        expect(state).toEqual({
            inputStage: "initial",
            currentValue: "0",
            previousValue: null,
            hiddenOperand: null,
            activeOperator: null,
        });
    });
});

describe("calculator test cases", () => {

    function testInputSequence(inputSequence: ValidInput[], expectedEndState: string | Partial<CalculatorState>) {

        const matcher: Partial<CalculatorState> = typeof expectedEndState === "string"
            ? {
                currentValue: expectedEndState,
            }
            : expectedEndState;

        const endState: CalculatorState = inputSequence.reduce(
            (previousState: CalculatorState, input) =>
                processInput(previousState, input),
            initialState()
        );

        expect(endState).toMatchObject(matcher);
    }

    test("single digit", () => {
        testInputSequence(["0"], "0");
        testInputSequence(["1"], "1");
        testInputSequence(["2"], "2");
        testInputSequence(["5"], "5");
        testInputSequence(["9"], "9");
    });

    test("multiple digits", () => {
        testInputSequence(["2", "2"], "22");
        testInputSequence(["1", "8", "5"], "185");
    });

    test("decimal dot", () => {
        testInputSequence(["1", "8", ".", "5"], "18.5");
        testInputSequence(["0", "."], "0.");
        testInputSequence(["0", ".", "2"], "0.2");
    })

    test("implicit zero is added before decimal dot", () => {
        testInputSequence([".", "2"], "0.2");
    });

    test("no redundant leading zeroes", () => {
        testInputSequence(["0", "0", "0", "0"], "0");
        testInputSequence(["0", "1", "2", "3"], "123");
    });

    test("operations", () => {
        testInputSequence(["1", "+", "1", "="], "2");
        testInputSequence(["1", "-", "2", "="], "-1");
        testInputSequence(["1", "*", "5", "="], "5");
        testInputSequence(["1", "0", "/", "5", "="], "2");
    });

    test("multi-step operations", () => {
        testInputSequence(["1", "+", "1", "+", "1", "=",], "3");
        testInputSequence(["1", "-", "3", "*", "3", "=",], "-6");
    });

    test("consequentive calculations on recieved result", () => {
        testInputSequence(["1", "+", "1", "=", "+"], "2");
        testInputSequence(["1", "+", "1", "=", "+", "1", "=",], "3");
    });
});