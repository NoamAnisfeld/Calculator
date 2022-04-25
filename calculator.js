document.documentElement.addEventListener('keypress', (event) => {
    if (event.key === 'z' || event.key === 'Z') {
        location.reload(true /* bypass catch on Firefox */);
    }

    if (event.key === 'Enter') {
        document.getElementById('calculate').click();
    }
})

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function calculate() {
    let
        a = Number(document.getElementById('argument1').value),
        b = Number(document.getElementById('argument2').value);

    return add(a, b);
}    

function output(str) {
    document.getElementById('output').textContent = str;
}

document.getElementById('argument1').focus();

document.getElementById('calculate').addEventListener('click', () => {
    output(`Sum is: ${calculate().toFixed(2)}`);
});