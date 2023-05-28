import { CalculatorEngine } from './calculator-engine';

describe('single value inputs', () => {
    let calculatorEngine: CalculatorEngine;

    beforeEach(() => {
        calculatorEngine = new CalculatorEngine;
    });

    function testPattern(input: string[], expectedOutput: string) {
        input.forEach(char => calculatorEngine.serialize(char));
        expect(calculatorEngine.getCurrentStringValue()).toBe(expectedOutput);
    }

    test('simple number', () => {
        testPattern(['4', '6', '1'], '461');
    });

    test('decimal number', () => {
        testPattern(['4', '.', '6', '1'], '4.61');
    });

    test('decimal number with implicit zero', () => {
        testPattern(['.', '3', '5'], '0.35');
    });

    test('ignores leading zeroes', () => {
        testPattern(['0', '3'], '3');
    });

    test('ignores multiple zeroes', () => {
        testPattern(['0', '0', '0'], '0');
    });

    test.failing('limits to 10 digits', () => {
        testPattern(
            ['2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2'],
            '2222222222'
        );
    });

    test.failing('limits to 10 digits - decimal', () => {
        testPattern(
            ['2', '2', '2', '2', '2', '2', '.', '2', '2', '2', '2', '2', '2', '2'],
            '222222.2222'
        );
    });
});
