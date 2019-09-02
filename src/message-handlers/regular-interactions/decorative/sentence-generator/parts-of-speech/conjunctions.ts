import { randomElement } from "../../../../../utils/random";

const subordinatingConjunctions = [
    "after",
    "although",
    "as if",
    "as soon as",
    "because",
    "before",
    "even if",
    "if",
    "in case",
    "now that",
    "once",
    "since",
    "so that",
    "though",
    "unless",
    "until",
    "when",
    "wherever",
    "while",
];

export function subordinatingConjunction() {
    return randomElement(subordinatingConjunctions);
}
