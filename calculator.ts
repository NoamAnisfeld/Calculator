import { CalculatorEngine } from "./calculator-engine.js";

const DEVELOPMENT_MODE = true;

if (DEVELOPMENT_MODE) {
    document.documentElement.addEventListener('keyup', (event) => {
        if (event.code === 'KeyZ') {
            // @ts-ignore
            location.reload(true /* bypass catch on Firefox */);
        }
    });
}

function main(): void {
    const calculatorEngine = new CalculatorEngine,
        calculatorUI = document.querySelector(".calculator-wrapper"),
	    inputElement = calculatorUI?.querySelector('input[type="text"]') as HTMLInputElement;

    if (!calculatorUI || !inputElement) {
        return;
    }
    
    calculatorUI.addEventListener("click", (event) => {
        const target = event.target,
            key = (target as HTMLElement)?.dataset.key;

        if (!key) {
            return;
        }

        calculatorEngine.serialize(key);
        inputElement.value = calculatorEngine.getCurrentStringValue();
    });
}

main();