"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Tokenizer_instances, _a, _Tokenizer_prevToken, _Tokenizer_curToken, _Tokenizer_operation, _Tokenizer_expectNewInput, _Tokenizer_operationsMap, _Tokenizer_performOperation;
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
const calc = Object.freeze({
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    power: (a, b) => Math.pow(a, b)
});
class Tokenizer {
    constructor() {
        _Tokenizer_instances.add(this);
        _Tokenizer_prevToken.set(this, void 0);
        _Tokenizer_curToken.set(this, void 0);
        _Tokenizer_operation.set(this, void 0);
        _Tokenizer_expectNewInput.set(this, void 0);
        this.reset();
    }
    reset() {
        __classPrivateFieldSet(this, _Tokenizer_prevToken, null, "f");
        __classPrivateFieldSet(this, _Tokenizer_curToken, '0', "f");
        __classPrivateFieldSet(this, _Tokenizer_operation, null, "f");
        __classPrivateFieldSet(this, _Tokenizer_expectNewInput, true, "f");
    }
    getActiveToken() {
        return __classPrivateFieldGet(this, _Tokenizer_curToken, "f");
    }
    serialize(char) {
        if (/[0-9]/.test(char)) {
            if (__classPrivateFieldGet(this, _Tokenizer_expectNewInput, "f")) {
                __classPrivateFieldSet(this, _Tokenizer_curToken, char, "f");
                __classPrivateFieldSet(this, _Tokenizer_expectNewInput, false, "f");
            }
            else if (__classPrivateFieldGet(this, _Tokenizer_curToken, "f") === '0') {
                __classPrivateFieldSet(this, _Tokenizer_curToken, char, "f");
            }
            else {
                __classPrivateFieldSet(this, _Tokenizer_curToken, __classPrivateFieldGet(this, _Tokenizer_curToken, "f") + char, "f");
            }
        }
        else if (char === '.') {
            if (__classPrivateFieldGet(this, _Tokenizer_expectNewInput, "f")) {
                __classPrivateFieldSet(this, _Tokenizer_curToken, '0.', "f");
                __classPrivateFieldSet(this, _Tokenizer_expectNewInput, false, "f");
            }
            else if (!__classPrivateFieldGet(this, _Tokenizer_curToken, "f").includes('.')) {
                __classPrivateFieldSet(this, _Tokenizer_curToken, __classPrivateFieldGet(this, _Tokenizer_curToken, "f") + '.', "f");
            }
            else {
                throw `${this.constructor.name}: Attempt to add a second decimal dot in the same number`;
            }
        }
        else if (char === '=') {
            // TODO: Handle subsequent '=' (repeating last operation)
            __classPrivateFieldSet(this, _Tokenizer_curToken, __classPrivateFieldGet(this, _Tokenizer_instances, "m", _Tokenizer_performOperation).call(this), "f");
            __classPrivateFieldSet(this, _Tokenizer_prevToken, null, "f");
            __classPrivateFieldSet(this, _Tokenizer_operation, null, "f");
            __classPrivateFieldSet(this, _Tokenizer_expectNewInput, true, "f");
        }
        else if (Object.keys(__classPrivateFieldGet(Tokenizer, _a, "f", _Tokenizer_operationsMap)).includes(char)) {
            // TODO: Handle subsequent operators (replacing operation)
            if (__classPrivateFieldGet(this, _Tokenizer_operation, "f")) {
                __classPrivateFieldSet(this, _Tokenizer_curToken, __classPrivateFieldGet(this, _Tokenizer_instances, "m", _Tokenizer_performOperation).call(this), "f");
                __classPrivateFieldSet(this, _Tokenizer_prevToken, __classPrivateFieldGet(this, _Tokenizer_curToken, "f"), "f");
                __classPrivateFieldSet(this, _Tokenizer_operation, __classPrivateFieldGet(Tokenizer, _a, "f", _Tokenizer_operationsMap)[char], "f");
                __classPrivateFieldSet(this, _Tokenizer_expectNewInput, true, "f");
            }
            else {
                __classPrivateFieldSet(this, _Tokenizer_prevToken, __classPrivateFieldGet(this, _Tokenizer_curToken, "f"), "f");
                __classPrivateFieldSet(this, _Tokenizer_operation, __classPrivateFieldGet(Tokenizer, _a, "f", _Tokenizer_operationsMap)[char], "f");
                __classPrivateFieldSet(this, _Tokenizer_expectNewInput, true, "f");
            }
        }
        else {
            throw `${this.constructor.name}: Unrecognized character`;
        }
    }
}
_a = Tokenizer, _Tokenizer_prevToken = new WeakMap(), _Tokenizer_curToken = new WeakMap(), _Tokenizer_operation = new WeakMap(), _Tokenizer_expectNewInput = new WeakMap(), _Tokenizer_instances = new WeakSet(), _Tokenizer_performOperation = function _Tokenizer_performOperation() {
    if (__classPrivateFieldGet(this, _Tokenizer_operation, "f") && __classPrivateFieldGet(this, _Tokenizer_prevToken, "f") !== null) {
        return calc[__classPrivateFieldGet(this, _Tokenizer_operation, "f")](Number(__classPrivateFieldGet(this, _Tokenizer_prevToken, "f")), Number(__classPrivateFieldGet(this, _Tokenizer_curToken, "f"))).toString();
    }
    else {
        return __classPrivateFieldGet(this, _Tokenizer_curToken, "f");
    }
};
_Tokenizer_operationsMap = { value: {
        '+': 'add',
        '-': 'subtract',
        '*': 'multiply',
        'X': _a['*'],
        'x': _a['*'],
        '/': 'divide',
        '^': 'power',
    } };
const tokenizer = new Tokenizer;
let inputElement = document.getElementById('calculator__input');
let outputElement = document.getElementById('calculator__result');
inputElement.focus();
inputElement.addEventListener('keypress', event => {
    try {
        tokenizer.serialize(event.key);
        console.log(tokenizer.getActiveToken());
        outputElement.textContent = tokenizer.getActiveToken();
    }
    catch (err) {
        console.error(err);
        outputElement.innerHTML = `<span style="background:red;">${err}</span>`;
    }
});
