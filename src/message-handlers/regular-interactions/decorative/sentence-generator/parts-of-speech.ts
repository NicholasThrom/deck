import * as indefiniteUntyped from "indefinite";
import { randomElement, weightedRandomElement } from "../../../../utils/random";
import { capitalizeFirstLetter } from "./util";

const indefinite = indefiniteUntyped as unknown as (string: string) => string;

export function randomSentence() {
    return capitalizeFirstLetter(`${articledThing()} is ${descriptor()}!`);
}

function thing() {
    return randomElement([
        "dog",
        "cat",
        "mouse",
        "slice of cheese",
        "mountain",
        "tree",
        "ant",
        "fly",
        "piece of paper",
        "empty coffee cup",
        "mouse trap",
        "pepperoni",
        "tower",
        "desk",
        "chair",
        "object",
        "car",
        "girl",
        "boy",
        "wheel",
        "game",
        "joke",
        "ditch",
        "road",
        "word",
        "book",
        "hair",
        "bone",
        "murderer",
        "teacher",
        "chalk brush",
        "ruler",
        "classroom",
    ]);
}

function adjective() {
    return randomElement([
        "good",
        "bad",
        "smelly",
        "tall",
        "cool",
        "purple",
        "orange",
        "green",
        "yellow",
        "red",
        "sneaky",
        "angry",
        "helpful",
        "dastardly",
        "sad",
        "dead",
        "funny",
        "relatable",
    ]);
}

function adjectiveModifier() {
    return randomElement([
        "really",
        "very",
        "quite",
        "pretty",
        "extremely",
        "slightly",
    ]);
}

function described(thing: () => string): string {
    return weightedRandomElement([
        [2, thing],
        [1, () => `${descriptor()} ${described(thing)}`],
    ])();
}

function articledThing() {
    return weightedRandomElement([
        [2, () => `the ${described(thing)}`],
        [2, () => `${indefinite(described(thing))}`],
        [1, () => `this ${described(thing)}`],
        [1, () => `that ${described(thing)}`],
    ])();
}

function modifiedAdjective() {
    return `${adjectiveModifier()} ${adjective()}`;
}

function descriptor() {
    return randomElement([
        adjective,
        modifiedAdjective,
    ])();
}
