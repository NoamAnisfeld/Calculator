import { initialState } from "./calculatorLogic";
import { testInputSequence } from "./calculatorLogic.helper.test";
import { describe, expect, it, test } from "vitest";

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

describe("first key", () => {

    test("initial digit input is interepreted correctly", () => {
        testInputSequence(["0"], { ...initialState(), inputStage: "valueInput", currentValue: "0" }, true);
        testInputSequence(["1"], { ...initialState(), inputStage: "valueInput", currentValue: "1" }, true);
        testInputSequence(["2"], { ...initialState(), inputStage: "valueInput", currentValue: "2" }, true);
        testInputSequence(["3"], { ...initialState(), inputStage: "valueInput", currentValue: "3" }, true);
        testInputSequence(["4"], { ...initialState(), inputStage: "valueInput", currentValue: "4" }, true);
        testInputSequence(["5"], { ...initialState(), inputStage: "valueInput", currentValue: "5" }, true);
        testInputSequence(["6"], { ...initialState(), inputStage: "valueInput", currentValue: "6" }, true);
        testInputSequence(["7"], { ...initialState(), inputStage: "valueInput", currentValue: "7" }, true);
        testInputSequence(["8"], { ...initialState(), inputStage: "valueInput", currentValue: "8" }, true);
        testInputSequence(["9"], { ...initialState(), inputStage: "valueInput", currentValue: "9" }, true);
    });

    test("a dot can be added to the initial zero", () => {    
        testInputSequence(["."], { ...initialState(), inputStage: "valueInput", currentValue: "0." }, true);
    });

    test("a negative sign can be added to the initial zero", () => {
        testInputSequence(["-"], { ...initialState(), inputStage: "valueInput", currentValue: "-0" }, true);
    });

    test("an operator other than minus on initial input is applied on the operand zero", () => {
        testInputSequence(["+"], { ...initialState(), inputStage: "operatorSelected", activeOperator: "+" }, true);
        testInputSequence(["*"], { ...initialState(), inputStage: "operatorSelected", activeOperator: "*" }, true);
        testInputSequence(["/"], { ...initialState(), inputStage: "operatorSelected", activeOperator: "/" }, true);
    });
  
    test("the result operation or clear operation as initial input leaves it on inital state", () => {
        testInputSequence(["="], initialState(), true);
        testInputSequence(["C"], initialState(), true);
    });
})

describe("first operand", () => {

    test("integer", () => {
        testInputSequence(
            ["1",  "3",   "3",    "1",     "9",      "3",       "5",        "0",         "8",          "8"],
            ["1", "13", "133", "1331", "13319", "133193", "1331935", "13319350", "133193508", "1331935088"], // up to 10 digits. another test should assure that no more digits are accepted
        );
    });

    test("negative integer", () => {
        testInputSequence(
            [ "-",  "3",   "3"],
            ["-0", "-3", "-33"],
        );
    });

    test("fraction", () => {
        testInputSequence(
            ["0",  ".",   "5",    "9"],
            ["0", "0.", "0.5", "0.59"],
        );
    });

    test("fraction with implicit zero", () => {
        testInputSequence(
            [ ".",   "5",    "9"],
            ["0.", "0.5", "0.59"],
        );
    });

    test("negative fraction", () => {
        testInputSequence(
            [ "-",  "0",   ".",    "4"],
            ["-0", "-0", "-0.", "-0.4"],
        );
    });

    test("negative fraction with implicit zero", () => {
        testInputSequence(
            [ "-",   ".",    "4"],
            ["-0", "-0.", "-0.4"],
        );
    });

    test("decimal", () => {
        testInputSequence(
            ["7",  "2",   "5",    ".",     "1",      "1",       "0",        "3"],
            ["7", "72", "725", "725.", "725.1", "725.11", "725.110", "725.1103"],
        );
    });

    test("negative decimal", () => {
        testInputSequence(
            [ "-",  "7",   "2",    "5",     ".",      "1",       "1",        "0",         "3"],
            ["-0", "-7", "-72", "-725", "-725.", "-725.1", "-725.11", "-725.110", "-725.1103"],
        );
    });
})

describe("old test cases which weren't expanded yet", () => {

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

// ToDo: Test cases for operations
// - single step operations
// - multistep operations (including displaying intermediate results)
// - repeating "=" repeats last operation
// - test correct rounding

// ToDo: Test cases for errors
// - division by zero
// - positive overflow
// - negative overflow

// ToDo: Test cases for ignored keys
// - leading zeroes are ignored
// - digits or dot beyond the allowed length are ignored
// - second dot is ignored

// ToDo: Test cases for special situations
// - operator can be replaced (except by "-")
// - what does repeating the same operator do?
// - what does "=" does when used right after first argument?
// - what does "=" does when used right after operator?
// - repeat (some?) of the test cases of first argument, for second (and third?) argument
// - especially test that "-" is interpretted correctly as either negation or operator depending on context