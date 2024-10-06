import { Grid } from "@radix-ui/themes";
import CalculatorButton from "./CalculatorButton";
import { ValidInput } from "../logic/types";

type CalculatorButtonsProps = {
    onButtonClicked: (input: ValidInput) => void;
}

export function CalculatorButtons({
    onButtonClicked
}: CalculatorButtonsProps) {

    return (
        <Grid columns="4" gap="2" className="calculator-button-grid">
            <CalculatorButton value="0" clickHandler={onButtonClicked} keyboardKeys={["0"]}                gridArea="d0">        0 </CalculatorButton>
            <CalculatorButton value="1" clickHandler={onButtonClicked} keyboardKeys={["1"]}                gridArea="d1">        1 </CalculatorButton>
            <CalculatorButton value="2" clickHandler={onButtonClicked} keyboardKeys={["2"]}                gridArea="d2">        2 </CalculatorButton>
            <CalculatorButton value="3" clickHandler={onButtonClicked} keyboardKeys={["3"]}                gridArea="d3">        3 </CalculatorButton>
            <CalculatorButton value="4" clickHandler={onButtonClicked} keyboardKeys={["4"]}                gridArea="d4">        4 </CalculatorButton>
            <CalculatorButton value="5" clickHandler={onButtonClicked} keyboardKeys={["5"]}                gridArea="d5">        5 </CalculatorButton>
            <CalculatorButton value="6" clickHandler={onButtonClicked} keyboardKeys={["6"]}                gridArea="d6">        6 </CalculatorButton>
            <CalculatorButton value="7" clickHandler={onButtonClicked} keyboardKeys={["7"]}                gridArea="d7">        7 </CalculatorButton>
            <CalculatorButton value="8" clickHandler={onButtonClicked} keyboardKeys={["8"]}                gridArea="d8">        8 </CalculatorButton>
            <CalculatorButton value="9" clickHandler={onButtonClicked} keyboardKeys={["9"]}                gridArea="d9">        9 </CalculatorButton>
            <CalculatorButton value="." clickHandler={onButtonClicked} keyboardKeys={["."]}                gridArea="dot">       . </CalculatorButton>
            <CalculatorButton value="+" clickHandler={onButtonClicked} keyboardKeys={["+"]}                gridArea="add">       + </CalculatorButton>
            <CalculatorButton value="-" clickHandler={onButtonClicked} keyboardKeys={["-"]}                gridArea="substract"> - </CalculatorButton>
            <CalculatorButton value="*" clickHandler={onButtonClicked} keyboardKeys={["*", "X", "x"]}      gridArea="multiply">  x </CalculatorButton>
            <CalculatorButton value="/" clickHandler={onButtonClicked} keyboardKeys={["/"]}                gridArea="divide">    ÷ </CalculatorButton>
            <CalculatorButton value="=" clickHandler={onButtonClicked} keyboardKeys={["=", "Enter"]}       gridArea="result">    = </CalculatorButton>
            <CalculatorButton value="C" clickHandler={onButtonClicked} keyboardKeys={["C", "c", "Delete"]} gridArea="C">         C </CalculatorButton>
        </Grid>
    );
}