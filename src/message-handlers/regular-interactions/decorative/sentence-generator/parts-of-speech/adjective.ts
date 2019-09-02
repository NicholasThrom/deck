import { randomElement, weightedRandomElement } from "../../../../../utils/random";
import { adjectiveOrAdverbModifier } from "./modifier";

const adjectives = [
    "angry",
    "bad",
    "cool",
    "dastardly",
    "dead",
    "funny",
    "good",
    "green",
    "helpful",
    "orange",
    "purple",
    "red",
    "relatable",
    "sad",
    "smelly",
    "sneaky",
    "tall",
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
        [16, () => undefined],
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
