import { randomElement } from "../../../../../utils/random";

const modifiers = [
    "extremely",
    "pretty",
    "quite",
    "really",
    "slightly",
    "too",
    "very",
];

export function adjectiveOrAdverbModifier() {
    return randomElement(modifiers);
}
