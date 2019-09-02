import { randomElement, weightedRandomElement } from "../../../../../utils/random";

// Data

interface Verb {
    singular?: string;
    regular?: string;
    past?: string;
    gerund?: string;
}

const transitiveVerbs: Verb[] = [
    {
        singular: "smacks",
        regular: "smack",
        past: "smacked",
        gerund: "smacking",
    },
];

const intransitiveVerbs: Verb[] = [
    {
        singular: "thinks",
        regular: "think",
        past: "thought",
        gerund: "thinking",
    },
];

function filterVerbs(
    verbs: Verb[],
    selector: (verb: Verb) => string | undefined,
    transformer: (string: string) => string = (s) => s,
): string[] {
    return verbs
        .map(selector)
        .filter((verb): verb is string => verb !== undefined)
        .map(transformer);
}

const singularTransitiveVerbs = filterVerbs(transitiveVerbs, (verb) => verb.singular);
const regularTransitiveVerbs = filterVerbs(transitiveVerbs, (verb) => verb.regular);
const pastTransitiveVerbs = filterVerbs(transitiveVerbs, (verb) => verb.past);

const singularIntransitiveVerbs = filterVerbs(intransitiveVerbs, (verb) => verb.singular);
const regularIntransitiveVerbs = filterVerbs(intransitiveVerbs, (verb) => verb.regular);
const pastIntransitiveVerbs = filterVerbs(intransitiveVerbs, (verb) => verb.past);

// Intransitive generators

export function singularTransitiveVerb() {
    return randomElement(singularTransitiveVerbs);
}

export function transitiveVerb() {
    return randomElement(regularTransitiveVerbs);
}

export function pastTransitiveVerb() {
    return randomElement(pastTransitiveVerbs);
}

export function futureTransitiveVerb() {
    const prefix = weightedRandomElement([
        [4, "will"],
        [1, "shall"],
    ]);
    return `${prefix} ${transitiveVerb()}`;
}

export function singularTransitiveVerbAnyTense() {
    return randomElement([
        singularTransitiveVerb,
        pastTransitiveVerb,
        futureTransitiveVerb,
    ])();
}

export function pluralTransitiveVerbAnyTense() {
    return randomElement([
        transitiveVerb,
        pastTransitiveVerb,
        futureTransitiveVerb,
    ])();
}

// Transitive Generators

export function singularIntransitiveVerb() {
    return randomElement(singularIntransitiveVerbs);
}

export function intransitiveVerb() {
    return randomElement(regularIntransitiveVerbs);
}

export function pastIntransitiveVerb() {
    return randomElement(pastIntransitiveVerbs);
}

export function futureIntransitiveVerb() {
    const prefix = weightedRandomElement([
        [4, "will"],
        [1, "shall"],
    ]);
    return `${prefix} ${intransitiveVerb()}`;
}

export function singularIntransitiveVerbAnyTense() {
    return randomElement([
        singularIntransitiveVerb,
        pastIntransitiveVerb,
        futureIntransitiveVerb,
    ])();
}

export function pluralIntransitiveVerbAnyTense() {
    return randomElement([
        intransitiveVerb,
        pastIntransitiveVerb,
        futureIntransitiveVerb,
    ])();
}
