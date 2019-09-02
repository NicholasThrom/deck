import * as indefiniteUntyped from "indefinite";
import { randomElement, weightedRandomElement } from "../../../../utils/random";
import { pluralNoun, singularNoun } from "./parts-of-speech/nouns";
import {
    pluralIntransitiveVerbAnyTense,
    pluralTransitiveVerbAnyTense,
    singularIntransitiveVerbAnyTense,
    singularTransitiveVerbAnyTense,
} from "./parts-of-speech/verbs";
import { capitalizeFirstLetter } from "./util";

const indefinite = indefiniteUntyped as unknown as (string: string) => string;

export function randomSentence() {
    return capitalizeFirstLetter(`${randomElement([
        description,
        transitiveAction,
        intransitiveAction,
    ])()}.`);
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

function adjectiveOrAdverbModifier() {
    return randomElement([
        "really",
        "very",
        "quite",
        "pretty",
        "extremely",
        "slightly",
        "too",
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
        [2, () => `the ${described(singularNoun)}`],
        [2, () => `${indefinite(described(singularNoun))}`],
        [1, () => `this ${described(singularNoun)}`],
        [1, () => `that ${described(singularNoun)}`],
    ])();
}

function articledThings() {
    return weightedRandomElement([
        [2, () => `the ${described(pluralNoun)}`],
        [2, () => `${described(pluralNoun)}`],
        [1, () => `these ${described(pluralNoun)}`],
        [1, () => `those ${described(pluralNoun)}`],
    ])();
}

function modifiedAdjective() {
    return `${adjectiveOrAdverbModifier()} ${adjective()}`;
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

function intransitiveAction() {
    return randomElement([
        () => `${articledThing()} ${singularIntransitiveVerbAnyTense()}`,
        () => `${articledThings()} ${pluralIntransitiveVerbAnyTense()}`,
    ])();
}

function transitiveAction() {
    return randomElement([
        () => `${articledThing()} ${singularTransitiveVerbAnyTense()} ${randomElement([articledThings, articledThing])()}`,
        () => `${articledThings()} ${pluralTransitiveVerbAnyTense()} ${randomElement([articledThings, articledThing])()}`,
    ])();
}
