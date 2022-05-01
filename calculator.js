"use strict";
const DEBUG = true;
if (DEBUG) {
    document.documentElement.addEventListener('keypress', (event) => {
        if (event.key === 'z' || event.key === 'Z') {
            // @ts-ignore
            location.reload(true /* bypass catch on Firefox */);
        }
    });
}
;
const calculatorActions = Object.freeze({
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    power: (a, b) => Math.pow(a, b)
});
class CalculatorTokenizer {
    #prevToken;
    #curToken;
    #operation;
    #expectNewInput;
    static #operationsMap = {
        '+': 'add',
        '-': 'subtract',
        '*': 'multiply',
        'X': 'multiply',
        'x': 'multiply',
        '/': 'divide',
        '^': 'power',
    };
    constructor() {
        this.reset();
    }
    reset() {
        this.#prevToken = '';
        this.#curToken = '0';
        this.#operation = '';
        this.#expectNewInput = true;
    }
    getCurrentStringValue() {
        return this.#curToken;
    }
    #performOperation() {
        if (this.#operation && this.#prevToken) {
            return calculatorActions[this.#operation](Number(this.#prevToken), Number(this.#curToken)).toString();
        }
        else {
            return this.#curToken;
        }
    }
    serialize(char) {
        if (/[0-9]/.test(char)) {
            if (this.#expectNewInput) {
                this.#curToken = char;
                this.#expectNewInput = false;
            }
            else if (this.#curToken === '0') {
                this.#curToken = char;
            }
            else {
                this.#curToken += char;
            }
        }
        else if (char === '.') {
            if (this.#expectNewInput) {
                this.#curToken = '0.';
                this.#expectNewInput = false;
            }
            else if (!this.#curToken.includes('.')) {
                this.#curToken += '.';
            }
            else {
                throw `${this.constructor.name}: Attempt to add a second decimal dot in the same number`;
            }
        }
        else if (char === '=') {
            // TODO: Handle subsequent '=' (repeating last operation)
            this.#curToken = this.#performOperation();
            this.#prevToken = '';
            this.#operation = '';
            this.#expectNewInput = true;
        }
        else if (Object.keys(CalculatorTokenizer.#operationsMap).includes(char)) {
            // TODO: Handle subsequent operators (replacing operation)
            if (this.#operation) {
                this.#curToken = this.#performOperation();
                this.#prevToken = this.#curToken;
                this.#operation = CalculatorTokenizer.#operationsMap[char];
                this.#expectNewInput = true;
            }
            else {
                this.#prevToken = this.#curToken;
                this.#operation = CalculatorTokenizer.#operationsMap[char];
                this.#expectNewInput = true;
            }
        }
        else {
            throw `${this.constructor.name}: Unrecognized character`;
        }
    }
}
function main() {
    const tokenizer = new CalculatorTokenizer;
    let inputElement = document.getElementById('calculator__input');
    let outputElement = document.getElementById('calculator__result');
    if (inputElement === null) {
        return;
    }
    inputElement.focus();
    inputElement.addEventListener('keypress', event => {
        if (outputElement === null) {
            return;
        }
        try {
            tokenizer.serialize(event.key);
            console.log(tokenizer.getCurrentStringValue());
            outputElement.textContent = tokenizer.getCurrentStringValue();
        }
        catch (err) {
            console.error(err);
            outputElement.innerHTML = `<span style="background:red;">${err}</span>`;
        }
    });
}
main();
