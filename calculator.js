"use strict"

const DEBUG = true;

if (DEBUG) {
    document.documentElement.addEventListener('keypress', (event) => {
        if (event.key === 'z' || event.key === 'Z') {
            location.reload(true /* bypass catch on Firefox */);
        }
    })
};

const calc = Object.freeze({
    add: (a, b) => a + b,    
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    power: (a, b) => Math.pow(a, b)
});

class Tokenizer {
    #prevToken
    #curToken
    #operation
    #expectNewInput

    static #operationsMap = {
        '+': 'add',
        '-': 'subtract',
        '*': 'multiply',
        'X': this['*'],
        'x': this['*'],
        '/': 'divide',
        '^': 'power',
    }

    constructor() {
        this.reset();
    }

    reset() {
        this.#prevToken = null;
        this.#curToken = '0';
        this.#operation = null;
        this.#expectNewInput = true;
    }

    getActiveToken() {
        return this.#curToken;
    }

    #performOperation() {
        if (this.#operation && this.#prevToken !== null) {
            return calc[this.#operation](
                Number(this.#prevToken),
                Number(this.#curToken)
            ).toString();
        } else {
            return this.#curToken;
        }
    }

    serialize(char) {
        if (/[0-9]/.test(char)) {
            if (this.#expectNewInput) {
                this.#curToken = char;
                this.#expectNewInput = false;
            } else if (this.#curToken === '0') {
                this.#curToken = char;
            } else {
                this.#curToken += char;
            }
        } else if (char === '.') {
            if (this.#expectNewInput) {
                this.#curToken = '0.';
                this.#expectNewInput = false;
            } else if (!this.#curToken.includes('.')) {
                this.#curToken += '.';
            } else {
                throw `${this.constructor.name}: Attempt to add a second decimal dot in the same number`;
            }
        } else if (char === '=') {
            // TODO: Handle subsequent '=' (repeating last operation)

            this.#curToken = this.#performOperation();
            this.#prevToken = null;
            this.#operation = null;
            this.#expectNewInput = true;
        } else if (Object.keys(Tokenizer.#operationsMap).includes(char)) {
            // TODO: Handle subsequent operators (replacing operation)

            if (this.#operation) {
                this.#curToken = this.#performOperation();
                this.#prevToken = this.#curToken;
                this.#operation = Tokenizer.#operationsMap[char];
                this.#expectNewInput = true;
            } else {
                this.#prevToken = this.#curToken;
                this.#operation = Tokenizer.#operationsMap[char];
                this.#expectNewInput = true;
            }
        } else {
            throw `${this.constructor.name}: Unrecognized character`;
        }
    }
}

const tokenizer = new Tokenizer;

let inputElement = document.getElementById('calculator__input');
inputElement.focus();
inputElement.addEventListener('keypress', event => {
    try {
        tokenizer.serialize(event.key);
        console.log(tokenizer.getActiveToken());
    } catch (err) {
        console.error(err);
    }
});