import { CalculatorEngine } from "./calculator-engine.js";

const DEBUG = true;

if (DEBUG) {
    document.documentElement.addEventListener('keypress', (event) => {
        if (event.key === 'z' || event.key === 'Z') {
            // @ts-ignore
            location.reload(true /* bypass catch on Firefox */);
        }
    });
};

function main(): void {
    const tokenizer = new CalculatorEngine;

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
        } catch (err) {
            console.error(err);
            outputElement.innerHTML = `<span style="background:red;">${err}</span>`;
        }
    });
}

main();