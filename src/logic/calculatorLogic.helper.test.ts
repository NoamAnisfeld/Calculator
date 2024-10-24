import { initialState, processInput } from "./calculatorLogic";
import type { CalculatorState, ValidInput } from "./types";
import { expect } from "vitest";

export {
    testInputSequence,
}

function testInputSequence(
    inputSequence: ValidInput[],
    expectedEndState: string | Partial<CalculatorState> | (string | Partial<CalculatorState>)[],
    strict = false,
) {

    if (Array.isArray(expectedEndState)) {
        assertAllSteps(inputSequence, expectedEndState, strict);
    } else {
        assertEndState(inputSequence, expectedEndState, strict);
    }
}

function assertEndState(
    inputSequence: ValidInput[],
    expectedEndState: string | Partial<CalculatorState>,
    strict = false,
) {

    const endState: CalculatorState = inputSequence.reduce(
        (previousState: CalculatorState, input) =>
            processInput(previousState, input),
        initialState()
    );

    const matcher = typeof expectedEndState === "string"
        ? {
            currentValue: expectedEndState,
        }
        : expectedEndState;


    if (strict) {
        expect(endState).toStrictEqual(matcher);
    } else {
        expect(endState).toMatchObject(matcher);
    }
}

function assertAllSteps(
    inputSequence: ValidInput[],
    expectedStateSequence: (string | Partial<CalculatorState>)[],
    strict = false,
) {

    if (inputSequence.length !== expectedStateSequence.length) {
        throw new Error("input sequence and expected state sequence have different lengths");
    }

    const stateSequence: CalculatorState[] = [];
    for (let i = 0; i < inputSequence.length; i++) {
        const state = i === 0 ? initialState() : stateSequence[stateSequence.length - 1];
        const input = inputSequence[i];

        stateSequence.push(processInput(state, input));
    }

    const matcher = expectedStateSequence.map((s) => typeof s === "string" ? { currentValue: s } : s);

    if (strict) {
        expect(stateSequence).toStrictEqual(matcher);
    } else {
        expect(stateSequence).toMatchObject(matcher);
    }
}
