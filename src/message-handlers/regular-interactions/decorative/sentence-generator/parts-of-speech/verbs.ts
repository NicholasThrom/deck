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
    { singular: "considers", regular: "consider", past: "considered", gerund: "considering" },
    { singular: "converses with", regular: "converse with", past: "conversed with", gerund: "conversing with" },
    { singular: "eats", regular: "eat", past: "ate", gerund: "eating" },
    { singular: "has", regular: "have", past: "had", gerund: "having" },
    { singular: "hits", regular: "hit", past: "hit", gerund: "hitting" },
    { singular: "kills", regular: "kill", past: "killed", gerund: "killing" },
    { singular: "licks", regular: "lick", past: "licked", gerund: "licking" },
    { singular: "likes", regular: "like", past: "liked", gerund: "liking" },
    { singular: "loves", regular: "love", past: "loved", gerund: "loving" },
    { singular: "smacks", regular: "smack", past: "smacked", gerund: "smacking" },
    { singular: "speaks with", regular: "speak with", past: "spoke with", gerund: "speaking with" },
    { singular: "talks to", regular: "talk to", past: "talked to", gerund: "talking to" },
];

const intransitiveVerbs: Verb[] = [
    { singular: "beeps", regular: "beep", past: "beeped", gerund: "beeping" },
    { singular: "dies", regular: "die", past: "died", gerund: "dying" },
    { singular: "falls", regular: "fall", past: "fell", gerund: "falling" },
    { singular: "knows", regular: "know", past: "knew", gerund: "knowing" },
    { singular: "lies", regular: "lie", past: "lied", gerund: "lying" },
    { singular: "runs", regular: "run", past: "ran", gerund: "running" },
    { singular: "sings", regular: "sing", past: "sang", participle: "sung", gerund: "singing" },
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

interface VerbCollection {
    singular: string[];
    regular: string[];
    past: string[];
    participle: string[];
    gerund: string[];
}

type Plurality = "singular" | "plural";

function separateVerbs(verbs: Verb[]): VerbCollection {
    return {
        singular: filterVerbs(verbs, (verb) => verb.singular),
        regular: filterVerbs(verbs, (verb) => verb.regular),
        past: filterVerbs(verbs, (verb) => verb.past),
        participle: filterVerbs(verbs, (verb) => verb.participle || verb.past),
        gerund: filterVerbs(verbs, (verb) => verb.gerund),
    };
}

const transitive = separateVerbs(transitiveVerbs);
const intransitive = separateVerbs(intransitiveVerbs);

// General generators

function futurePrefix() {
    return weightedRandomElement([[4, "will"], [1, "shall"]]);
}

// Transitive generators

function presentVerb(verbCollection: VerbCollection, plurality: Plurality) {
    switch (plurality) {
        case "singular": return randomElement(verbCollection.singular);
        case "plural": return randomElement(verbCollection.regular);
    }
}

function preteriteVerb(verbCollection: VerbCollection, plurality: Plurality) {
    return randomElement(verbCollection.past);
}

function presentContinuousVerb(verbCollection: VerbCollection, plurality: Plurality) {
    switch (plurality) {
        case "singular": return `is ${randomElement(verbCollection.gerund)}`;
        case "plural": return `are ${randomElement(verbCollection.gerund)}`;
    }
}

function presentPerfectVerb(verbCollection: VerbCollection, plurality: Plurality) {
    switch (plurality) {
        case "singular": return `has ${randomElement(verbCollection.participle)}`;
        case "plural": return `have ${randomElement(verbCollection.participle)}`;
    }
}

function futureVerb(verbCollection: VerbCollection, plurality: Plurality) {
    const prefix = futurePrefix();
    return `${prefix} ${randomElement(verbCollection.regular)}`;
}

function futurePerfectVerb(verbCollection: VerbCollection, plurality: Plurality) {
    const prefix = futurePrefix();
    return `${prefix} ${randomElement(verbCollection.regular)}`;
}

function pastContinuous(verbCollection: VerbCollection, plurality: Plurality) {
    switch (plurality) {
        case "singular": return `was ${randomElement(verbCollection.gerund)}`;
        case "plural": return `were ${randomElement(verbCollection.gerund)}`;
    }
}

function pastPerfect(verbCollection: VerbCollection, plurality: Plurality) {
    return `had ${randomElement(verbCollection.participle)}`;
}

function futureContinuous(verbCollection: VerbCollection, plurality: Plurality) {
    return `will be ${randomElement(verbCollection.participle)}`;
}

function presentPerfectContinuous(verbCollection: VerbCollection, plurality: Plurality) {
    switch (plurality) {
        case "singular": return `has been ${randomElement(verbCollection.gerund)}`;
        case "plural": return `have been ${randomElement(verbCollection.gerund)}`;
    }
    return `has been ${randomElement(verbCollection.gerund)}`;
}

function pastPerfectContinuous(verbCollection: VerbCollection, plurality: Plurality) {
    return `had been ${randomElement(verbCollection.gerund)}`;
}

function futurePerfectContinuous(verbCollection: VerbCollection, plurality: Plurality) {
    return `will have been ${randomElement(verbCollection.gerund)}`;
}

function verbAnyTense(verbCollection: VerbCollection, plurality: Plurality) {
    return weightedRandomElement([
        [16, presentVerb],
        [8, preteriteVerb],
        [2, presentContinuousVerb],
        [2, presentPerfectVerb],
        [8, futureVerb],
        [1, futurePerfectVerb],
        [2, pastContinuous],
        [2, pastPerfect],
        [1, futureContinuous],
        [1, presentPerfectContinuous],
        [1, pastPerfectContinuous],
        [1, futurePerfectContinuous],
    ])(verbCollection, plurality);
}

export function transitiveSingularVerbAnyTense() {
    return verbAnyTense(transitive, "singular");
}

export function transitivePluralVerbAnyTense() {
    return verbAnyTense(transitive, "plural");
}

export function intransitiveSingularVerbAnyTense() {
    return verbAnyTense(intransitive, "singular");
}

export function intransitivePluralVerbAnyTense() {
    return verbAnyTense(intransitive, "plural");
}
