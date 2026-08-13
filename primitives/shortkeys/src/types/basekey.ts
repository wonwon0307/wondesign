type AlphaNumericKey =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

type SpecialKey =
  "`" | "-" | "=" | "[" | "]" | "\\" | ";" | "'" | "," | "." | "/";

export type BaseKey = AlphaNumericKey | SpecialKey;

// Future additions: Function keys and more Special keys
// Enter, Return, Tab, Space, Arrow keys, Backspace, etc.
