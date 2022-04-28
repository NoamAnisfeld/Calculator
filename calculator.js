const DEBUG = true;

document.documentElement.addEventListener('keypress', (event) => {
    if (DEBUG) {
        if (event.key === 'z' || event.key === 'Z') {
            location.reload(true /* bypass catch on Firefox */);
        }
    }

    if (event.key === 'Enter') {
        document.getElementById('calculate').click();
    }
})

const actions = {
    add: (a, b) => a + b,    
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    power: (a, b) => Math.pow(a, b)
}

function output(str) {
    document.getElementById('calculator__result').textContent = str;
}

document.getElementById('argument1').focus();

document.getElementById('calculator__keys').addEventListener('click', (event) => {
    let
        a = Number(document.getElementById('argument1').value),
        b = Number(document.getElementById('argument2').value),
        action = event.target.dataset.action;

    if (action) {
        output(actions[action](a, b));
    }
})