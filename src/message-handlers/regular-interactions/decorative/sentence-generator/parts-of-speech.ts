import * as indefiniteUntyped from "indefinite";
import { randomElement, weightedRandomElement } from "../../../../utils/random";
import { capitalizeFirstLetter } from "./util";

const indefinite = indefiniteUntyped as unknown as (string: string) => string;

export function randomSentence() {
    return capitalizeFirstLetter(`${description()}!`);
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

function things() {
    return randomElement([
        "dogs",
        "cats",
        "mice",
        "slices of cheese",
        "mountains",
        "trees",
        "ants",
        "flies",
        "pieces of paper",
        "empty coffee cups",
        "mouse traps",
        "towers",
        "desks",
        "chairs",
        "objects",
        "cars",
        "girls",
        "boys",
        "wheels",
        "games",
        "jokes",
        "ditches",
        "roads",
        "words",
        "books",
        "bones",
        "murderers",
        "teachers",
        "chalk brushes",
        "rulers",
        "classrooms",
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

function articledThings() {
    return weightedRandomElement([
        [2, () => `the ${described(things)}`],
        [2, () => `${described(things)}`],
        [1, () => `these ${described(things)}`],
        [1, () => `those ${described(things)}`],
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

function description() {
    return randomElement([
        () => `${articledThing()} is ${descriptor()}`,
        () => `${articledThings()} are ${descriptor()}`,
    ])();
}
