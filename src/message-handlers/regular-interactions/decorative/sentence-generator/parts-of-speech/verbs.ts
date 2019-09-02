import { randomElement, weightedRandomElement } from "../../../../../utils/random";

// Data

interface Verb {
    singular?: string;
    regular?: string;
    past?: string;
    participle?: string;
    gerund?: string;
}

const transitiveVerbs: Verb[] = [
    { singular: "converses with", regular: "converse with", past: "conversed with", gerund: "conversing with" },
    { singular: "considers", regular: "consider", past: "considered", gerund: "considering" },
    { singular: "eats", regular: "eat", past: "ate", gerund: "eatings" },
    { singular: "kills", regular: "kill", past: "killed", gerund: "killing" },
    { singular: "licks", regular: "lick", past: "licked", gerund: "licking" },
    { singular: "likes", regular: "like", past: "liked", gerund: "liking" },
    { singular: "loves", regular: "love", past: "loved", gerund: "loving" },
    { singular: "hits", regular: "hit", past: "hit", gerund: "hitting" },
    { singular: "smacks", regular: "smack", past: "smacked", gerund: "smacking" },
    { singular: "speaks with", regular: "speak with", past: "spoke with", gerund: "speaking with" },
    { singular: "talks to", regular: "talk to", past: "talked to", gerund: "talking to" },
];

const intransitiveVerbs: Verb[] = [
    { singular: "beeps", regular: "beep", past: "beeped", gerund: "beeping" },
    { singular: "dies", regular: "die", past: "died", gerund: "dying" },
    { singular: "falls", regular: "fall", past: "fell", gerund: "falling" },
    { singular: "lies", regular: "lie", past: "lied", gerund: "lying" },
    { singular: "runs", regular: "run", past: "ran", gerund: "running" },
    { singular: "sings", regular: "sing", past: "sang", participle: "sung", gerund: "sung" },
    { singular: "speaks", regular: "speak", past: "spoke", gerund: "speaking" },
    { singular: "talks", regular: "talk", past: "talked", gerund: "talking" },
    { singular: "thinks", regular: "think", past: "thought", gerund: "thinking" },
    { singular: "writes", regular: "write", past: "wrote", gerund: "writing" },
];

function filterVerbs(
    verbs: Verb[],
    selector: (verb: Verb) => string | undefined,
): string[] {
    return verbs
        .map(selector)
        .filter((verb): verb is string => verb !== undefined);
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
