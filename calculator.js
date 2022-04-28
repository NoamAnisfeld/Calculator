const DEBUG = true;

document.documentElement.addEventListener('keypress', (event) => {
    if (DEBUG) {
        if (event.key === 'z' || event.key === 'Z') {
            location.reload(true /* bypass catch on Firefox */);
        }
    }
})

const actions = {
    add: (a, b) => a + b,    
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    power: (a, b) => Math.pow(a, b)
}

class CalculatorInput {
    constructor(inputElement) {
        if (!inputElement instanceof HTMLElement) {
            throw '"new CalculatorInput" has been called with an ' + 
                'invalid argument. Must be called with an HTML element.';
        }

        let
            storedArgument,
            argument = 0,
            strRepresentation = '0',
            operation;

        const outputValue = inputElement.value !== undefined ?
            (val) => { inputElement.value = val; } :
            (val) => { inputElement.textContent = val; } ;

        inputElement.addEventListener('keypress', event => {
            event.preventDefault();
            let key = event.key;

            if (/[0-9]/.test(key)) {
                event.currentTarget.style.backgroundColor = null;
                if (strRepresentation === '0') {
                    strRepresentation = key;
                } else {
                    strRepresentation += key;
                }
                argument = Number(strRepresentation);
                outputValue(strRepresentation);
                console.log(`argument is ${argument}`);
                console.log(`strRepresentation is ${strRepresentation}`);
            } else if (key === '.' && !strRepresentation.includes('.')) {
                strRepresentation += key;
                argument = Number(strRepresentation);
            } else if (/[\+\-\*Xx\/\^]/.test(key)) {
                // toDo: handle subsequent operation inputs

                storedArgument = argument;
                argument = 0;
                strRepresentation = '0';
                operation = {
                    '+': 'add',
                    '-': 'subtract',
                    'X': 'multiply',
                    'x': this.X,
                    '*': this.X,
                    '/': 'divide',
                    '^': 'power'
                }[key];
            } else if (key === '=' || key === 'Enter') {
                if (operation) {
                    let result = actions[operation](storedArgument, argument);
                    storedArgument = argument;
                    argument = result;
                    strRepresentation = result.toString();
                    outputValue(strRepresentation);
                }
            } else {
                event.currentTarget.style.backgroundColor = '#F00';
            }
        });
    }
}

let inputElement = document.getElementById('calculator__input');
inputElement.focus();
new CalculatorInput(inputElement);