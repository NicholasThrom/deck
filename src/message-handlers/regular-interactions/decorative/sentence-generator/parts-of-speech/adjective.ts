import { randomElement, weightedRandomElement } from "../../../../../utils/random";
import { adjectiveOrAdverbModifier } from "./modifier";

const adjectives = [
    "angry",
    "awful",
    "bad",
    "brown",
    "buttery",
    "complicated",
    "cool",
    "dastardly",
    "dead",
    "fast",
    "funny",
    "good",
    "green",
    "hard-boiled",
    "haughty",
    "helpful",
    "lanky",
    "large",
    "massive",
    "moist",
    "orange",
    "purple",
    "red",
    "relatable",
    "robust",
    "sad",
    "sautéed",
    "slippery",
    "smelly",
    "sneaky",
    "stinky",
    "tall",
    "tall",
    "tiny",
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
