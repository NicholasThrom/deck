import { randomElement, weightedRandomElement } from "../../../../../utils/random";
import { adjective, modifiedAdjective } from "./adjective";
import { verbDescriptor } from "./adverb";
import { articledThing, articledThings } from "./articles";
import {
    intransitivePluralVerbAnyTense,
    intransitiveSingularVerbAnyTense,
    intransitiveVerbImperative,
    transitivePluralVerbAnyTense,
    transitiveSingularVerbAnyTense,
    transitiveVerbImperative,
} from "./verbs";

function description() {
    return randomElement([
        () => `${articledThing()} is ${adjective()}`,
        () => `${articledThings()} are ${modifiedAdjective()}`,
    ])();
}

function metaphor() {
    return randomElement([
        () => `${articledThing()} is ${articledThing()}`,
        () => `${articledThings()} are ${articledThings()}`,
    ])();
}

function simile() {
    return randomElement([
        () => `${articledThing()} is like ${articledThing()}`,
        () => `${articledThings()} are like ${articledThings()}`,
    ])();
}

function action() {
    return randomElement([
        () => `${articledThing()} ${intransitiveSingularVerbAnyTense(verbDescriptor())}`,
        () => `${articledThings()} ${intransitivePluralVerbAnyTense(verbDescriptor())}`,
        () => `${articledThing()} ${transitiveSingularVerbAnyTense(verbDescriptor())} ${randomElement([articledThings, articledThing])()}`,
        () => `${articledThings()} ${transitivePluralVerbAnyTense(verbDescriptor())} ${randomElement([articledThings, articledThing])()}`,
    ])();
}

function command() {
    return randomElement([
        () => `${intransitiveVerbImperative(verbDescriptor())}`,
        () => `${transitiveVerbImperative(verbDescriptor())} ${randomElement([articledThings, articledThing])()}`,
    ])();
}

export function independentClause() {
    return weightedRandomElement([
        [4, description],
        [2, metaphor],
        [4, simile],
        [8, action],
    ])();
}

export function mainClause() {
    return weightedRandomElement([
        [18, independentClause],
        [4, command],
    ])();
}
