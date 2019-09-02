import * as indefiniteUntyped from "indefinite";
import { randomElement, weightedRandomElement } from "../../../../utils/random";
import { adjective } from "./parts-of-speech/adjective";
import { adverb } from "./parts-of-speech/adverb";
import { adjectiveOrAdverbModifier } from "./parts-of-speech/modifier";
import { pluralNoun, singularNoun } from "./parts-of-speech/nouns";
import {
    intransitivePluralVerbAnyTense,
    intransitiveSingularVerbAnyTense,
    transitivePluralVerbAnyTense,
    transitiveSingularVerbAnyTense,
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

function describedThing(thing: () => string): string {
    return weightedRandomElement([
        [2, thing],
        [1, () => `${thingDescriptor()} ${describedThing(thing)}`],
    ])();
}

function articledThing() {
    return weightedRandomElement([
        [2, () => `the ${describedThing(singularNoun)}`],
        [2, () => `${indefinite(describedThing(singularNoun))}`],
        [1, () => `this ${describedThing(singularNoun)}`],
        [1, () => `that ${describedThing(singularNoun)}`],
    ])();
}

function articledThings() {
    return weightedRandomElement([
        [2, () => `the ${describedThing(pluralNoun)}`],
        [2, () => `${describedThing(pluralNoun)}`],
        [1, () => `these ${describedThing(pluralNoun)}`],
        [1, () => `those ${describedThing(pluralNoun)}`],
    ])();
}

function modifiedAdjective() {
    return `${adjectiveOrAdverbModifier()} ${adjective()}`;
}

function modifiedAdverb() {
    return `${adjectiveOrAdverbModifier()} ${adverb()}`;
}

function thingDescriptor() {
    return randomElement([
        adjective,
        modifiedAdjective,
    ])();
}

function verbDescriptor(): string | undefined {
    return weightedRandomElement<() => string | undefined>([
        [8, () => undefined],
        [4, () => `${adverb()}`],
        [2, () => `${modifiedAdverb()}`],
        [2, () => {
            const descriptor = verbDescriptor();
            return descriptor ? `${adverb()} ${descriptor}` : `${adverb()}`;
        }],
        [1, () => {
            const descriptor = verbDescriptor();
            return descriptor ? `${modifiedAdverb()} ${descriptor}` : `${adverb()}`;
        }],
    ])();
}

function description() {
    return randomElement([
        () => `${articledThing()} is ${thingDescriptor()}`,
        () => `${articledThings()} are ${thingDescriptor()}`,
    ])();
}

function intransitiveAction() {
    return randomElement([
        () => `${articledThing()} ${intransitiveSingularVerbAnyTense(verbDescriptor())}`,
        () => `${articledThings()} ${intransitivePluralVerbAnyTense(verbDescriptor())}`,
    ])();
}

function transitiveAction() {
    return randomElement([
        () => `${articledThing()} ${transitiveSingularVerbAnyTense(verbDescriptor())} ${randomElement([articledThings, articledThing])()}`,
        () => `${articledThings()} ${transitivePluralVerbAnyTense(verbDescriptor())} ${randomElement([articledThings, articledThing])()}`,
    ])();
}
