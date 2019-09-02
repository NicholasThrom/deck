import { randomElement, weightedRandomElement } from "../../../../../utils/random";
import { adjective, modifiedAdjective } from "./adjective";
import { verbDescriptor } from "./adverb";
import { articledThing, articledThings } from "./articles";
import {
    intransitivePluralVerbAnyTense,
    intransitiveSingularVerbAnyTense,
    transitivePluralVerbAnyTense,
    transitiveSingularVerbAnyTense,
} from "./verbs";

function description() {
    return randomElement([
        () => `${articledThing()} is ${adjective()}`,
        () => `${articledThings()} are ${modifiedAdjective()}`,
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

export function independentClause() {
    return weightedRandomElement([
        [4, description],
        [4, transitiveAction],
        [4, intransitiveAction],
    ])();
}
