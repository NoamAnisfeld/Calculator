type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type DecimalDot = ".";
type Operator = "+" | "-" | "*" | "/";
type ControlCharacter = "=" | "C"

export type ValidInput = Digit | DecimalDot | Operator | ControlCharacter
