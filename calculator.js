import { CalculatorEngine } from "./calculator-engine.js";
const DEBUG = true;
if (DEBUG) {
    document.documentElement.addEventListener('keypress', (event) => {
        if (event.key === 'z' || event.key === 'Z') {
            // @ts-ignore
            location.reload(true /* bypass catch on Firefox */);
        }
    });
}
function main() {
    const calculatorEngine = new CalculatorEngine, calculatorUI = document.querySelector(".calculator-wrapper"), inputElement = calculatorUI?.querySelector('input[type="text"]');
    if (!calculatorUI || !inputElement) {
        return;
    }
    calculatorUI.addEventListener("click", (event) => {
        const target = event.target, dataset = target instanceof HTMLElement ? target.dataset : null, key = dataset?.key;
        if (key) {
            calculatorEngine.serialize(key);
            inputElement.value = calculatorEngine.getCurrentStringValue();
        }
    });
    //     calculatorUI.addEventListener("keypress", (event) => {
    //         event.preventDefault();
    //         inputElement.value = event.key;
    //     });
    //     let inputElement = document.getElementById('calculator__input');
    //     let outputElement = document.getElementById('calculator__result');
    //     if (inputElement === null) {
    //         return;
    //     }
    //     inputElement.focus();
    //     inputElement.addEventListener('keypress', event => {
    //         if (outputElement === null) {
    //             return;
    //         }
    //         try {
    //             calculatorEngine.serialize(event.key);
    //             console.log(calculatorEngine.getCurrentStringValue());
    //             outputElement.textContent = calculatorEngine.getCurrentStringValue();
    //         } catch (err) {
    //             console.error(err);
    //             outputElement.innerHTML = `<span style="background:red;">${err}</span>`;
    //         }
    //     });
}
main();
