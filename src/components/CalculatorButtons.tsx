import { Grid, Button } from "@radix-ui/themes";
import { ValidInput } from "../logic/types";

type CalculatorButtonsProps = {
    onButtonClicked: (input: ValidInput) => void;
}

export function CalculatorButtons({
    onButtonClicked
}: CalculatorButtonsProps) {

    return (
        <Grid columns="4" gap="2" className="calculator-button-grid">
            <Button key="0" style={{ gridArea: "d0" }}        onClick={() => onButtonClicked("0")}> 0 </Button>
            <Button key="1" style={{ gridArea: "d1" }}        onClick={() => onButtonClicked("1")}> 1 </Button>
            <Button key="2" style={{ gridArea: "d2" }}        onClick={() => onButtonClicked("2")}> 2 </Button>
            <Button key="3" style={{ gridArea: "d3" }}        onClick={() => onButtonClicked("3")}> 3 </Button>
            <Button key="4" style={{ gridArea: "d4" }}        onClick={() => onButtonClicked("4")}> 4 </Button>
            <Button key="5" style={{ gridArea: "d5" }}        onClick={() => onButtonClicked("5")}> 5 </Button>
            <Button key="6" style={{ gridArea: "d6" }}        onClick={() => onButtonClicked("6")}> 6 </Button>
            <Button key="7" style={{ gridArea: "d7" }}        onClick={() => onButtonClicked("7")}> 7 </Button>
            <Button key="8" style={{ gridArea: "d8" }}        onClick={() => onButtonClicked("8")}> 8 </Button>
            <Button key="9" style={{ gridArea: "d9" }}        onClick={() => onButtonClicked("9")}> 9 </Button>
            <Button key="." style={{ gridArea: "dot" }}       onClick={() => onButtonClicked(".")}> . </Button>
            <Button key="+" style={{ gridArea: "add" }}       onClick={() => onButtonClicked("+")}> + </Button>
            <Button key="-" style={{ gridArea: "substract" }} onClick={() => onButtonClicked("-")}> - </Button>
            <Button key="*" style={{ gridArea: "multiply" }}  onClick={() => onButtonClicked("*")}> x </Button>
            <Button key="/" style={{ gridArea: "divide" }}    onClick={() => onButtonClicked("/")}> ÷ </Button>
            <Button key="=" style={{ gridArea: "result" }}    onClick={() => onButtonClicked("=")}> = </Button>
            <Button key="C" style={{ gridArea: "C" }}         onClick={() => onButtonClicked("C")}> C </Button>
        </Grid>
    );
}