import { randomElement, weightedRandomElement } from "../../../../../utils/random";
import { adjectiveOrAdverbModifier } from "./modifier";

const adjectives = [
    "angry",
    "awful",
    "bad",
    "big",
    "brown",
    "bulky",
    "buttery",
    "complicated",
    "cool",
    "dastardly",
    "dead",
    "enormous",
    "fast",
    "funny",
    "good",
    "green",
    "hard-boiled",
    "hard",
    "haughty",
    "helpful",
    "important",
    "injured",
    "lanky",
    "large",
    "maimed",
    "massive",
    "moist",
    "noisy",
    "orange",
    "purple",
    "quiet",
    "red",
    "relatable",
    "robust",
    "round",
    "sad",
    "sautéed",
    "short",
    "slippery",
    "smelly",
    "sneaky",
    "soft",
    "stinky",
    "strong",
    "tall",
    "teeny tiny",
    "tiny",
    "weak",
    "yellow",
];

export function adjective() {
    return randomElement(adjectives);
}

export function modifiedAdjective() {
    return `${adjectiveOrAdverbModifier()} ${adjective()}`;
}

export function thingDescriptor(): string | undefined {
    return weightedRandomElement<() => string | undefined>([
        [32, () => undefined],
        [8, () => `${adjective()}`],
        [2, () => `${modifiedAdjective()}`],
        [4, () => {
            const descriptor = thingDescriptor();
            return descriptor ? `${adjective()} ${descriptor}` : `${adjective()}`;
        }],
        [1, () => {
            const descriptor = thingDescriptor();
            return descriptor ? `${modifiedAdjective()} ${descriptor}` : `${adjective()}`;
        }],
    ])();
}

export function describedThing(thing: string): string {
    const descriptor = thingDescriptor();
    return descriptor ? `${descriptor} ${thing}` : thing;
}
