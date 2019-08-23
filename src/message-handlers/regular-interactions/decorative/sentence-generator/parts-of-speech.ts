import { randomElement } from "../../../../utils/random";
import { capitalizeFirstLetter } from "./util";

export function randomSentence() {
    return capitalizeFirstLetter(`The ${singularThing()} is ${descriptor()}!`);
}

function singularThing() {
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

function modifiedAdjective() {
    return `${adjectiveModifier()} ${adjective()}`;
}

function descriptor() {
    return randomElement([
        adjective,
        modifiedAdjective,
    ])();
}
