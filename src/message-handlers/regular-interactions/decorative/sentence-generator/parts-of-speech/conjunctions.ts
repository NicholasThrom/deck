import { randomElement } from "../../../../../utils/random";

const subordinatingConjunctions = [
    "after",
    "although",
    "as far as",
    "as if",
    "as soon as",
    "because",
    "before",
    "considering",
    "even if",
    "how",
    "if",
    "in case",
    "in that",
    "no matter how",
    "now that",
    "once",
    "provided",
    "since",
    "so that",
    "supposing",
    "though",
    "unless",
    "until",
    "when",
    "wherever",
    "whether",
    "while",
    "while",
];

export function subordinatingConjunction() {
    return randomElement(subordinatingConjunctions);
}
