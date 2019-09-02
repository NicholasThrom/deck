import { randomElement } from "../../../../utils/random";
import { thingDescriptor } from "./parts-of-speech/adjective";
import { verbDescriptor } from "./parts-of-speech/adverb";
import { articledThing, articledThings } from "./parts-of-speech/articles";
import {
    intransitivePluralVerbAnyTense,
    intransitiveSingularVerbAnyTense,
    transitivePluralVerbAnyTense,
    transitiveSingularVerbAnyTense,
} from "./parts-of-speech/verbs";
import { capitalizeFirstLetter } from "./util";

export function randomSentence() {
    return capitalizeFirstLetter(`${randomElement([
        description,
        transitiveAction,
        intransitiveAction,
    ])()}.`);
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
