export { CalculatorTokenizer as CalculatorEngine };

const calculatorActions = Object.freeze({
    add: (a: number, b: number) => a + b,
    subtract: (a: number, b: number) => a - b,
    multiply: (a: number, b: number) => a * b,
    divide: (a: number, b: number) => a / b,
    power: (a: number, b: number) => Math.pow(a, b)
});

class CalculatorTokenizer {
    #prevToken: string
    #curToken: string
    #operation: string
    #expectNewInput: boolean

    static #operationsMap = {
        '+': 'add',
        '-': 'subtract',
        '*': 'multiply',
        'X': 'multiply',
        'x': 'multiply',
        '/': 'divide',
        '^': 'power',
    }

    constructor() {
        this.reset();
    }

    reset() {
        this.#prevToken = '';
        this.#curToken = '0';
        this.#operation = '';
        this.#expectNewInput = true;
    }

    getCurrentStringValue(): string {
        return this.#curToken;
    }

    #performOperation(): string {
        if (this.#operation && this.#prevToken) {
            return calculatorActions[this.#operation](
                Number(this.#prevToken),
                Number(this.#curToken)
            ).toString();
        } else {
            return this.#curToken;
        }
    }

    serialize(char: string): void {
        // digit
        if (/[0-9]/.test(char)) {

            // start a new numeric value
            if (this.#expectNewInput) {
                this.#curToken = char;
                this.#expectNewInput = false;

            // or replace the current 0
            } else if (this.#curToken === '0') {
                this.#curToken = char;

            // or concat with the current value
            } else {
                this.#curToken += char;
            }

        // decimal dot
        } else if (char === '.') {

            // add an implicit 0
            if (this.#expectNewInput) {
                this.#curToken = '0.';
                this.#expectNewInput = false;

            // or add the dot to existing value
            } else if (!this.#curToken.includes('.')) {
                this.#curToken += '.';

            // or throw? when there's already a dot
            } else {
                // ToDo: Just ignore?
                throw `${this.constructor.name}: Attempt to add a second decimal dot in the same number`;
            }

        // equal sign: calculate result
        } else if (char === '=') {
            // ToDo: Handle subsequent '=' (repeating last operation)

            this.#curToken = this.#performOperation();
            this.#prevToken = '';
            this.#operation = '';
            this.#expectNewInput = true;

        // binary operator
        } else if (char in CalculatorTokenizer.#operationsMap) {
            // ToDo: Handle subsequent operators (replacing operation)

            // calculate temporary result if needed
            if (this.#operation) {
                this.#curToken = this.#performOperation();
            }

            this.#prevToken = this.#curToken;
            this.#operation = CalculatorTokenizer.#operationsMap[char];
            this.#expectNewInput = true;

        } else {
            const errorMsg = `${this.constructor.name}: Unrecognized input`;
            alert(errorMsg);
        }
    }
}
