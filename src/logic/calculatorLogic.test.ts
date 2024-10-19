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

describe("initial input", () => {

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
    })
  
    test("the result operation or clear operation as initial input leaves it on inital state", () => {
        testInputSequence(["="], initialState(), true);
        testInputSequence(["C"], initialState(), true);
    });
})

describe("calculator test cases", () => {

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