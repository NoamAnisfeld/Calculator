export { CalculatorTokenizer as CalculatorEngine };
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
