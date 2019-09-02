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
    { singular: "accepts", regular: "accept", past: "accepted", gerund: "accepting" },
    { singular: "accuses", regular: "accuse", past: "accused", gerund: "accusing" },
    { singular: "acquires", regular: "acquire", past: "acquired", gerund: "acquiring" },
    { singular: "affords", regular: "afford", past: "afforded", gerund: "affording" },
    { singular: "appreciates", regular: "appreciate", past: "appreciated", gerund: "appreciating" },
    { singular: "asks", regular: "ask", past: "asked", gerund: "asking" },
    { singular: "bakes", regular: "bake", past: "baked", gerund: "baking" },
    { singular: "brings", regular: "bring", past: "brought", gerund: "bringing" },
    { singular: "burns", regular: "burn", past: "burned", gerund: "burning" },
    { singular: "buys", regular: "buy", past: "bought", gerund: "buying" },
    { singular: "chops", regular: "chop", past: "chopped", gerund: "chopping" },
    { singular: "considers", regular: "consider", past: "considered", gerund: "considering" },
    { singular: "converses with", regular: "converse with", past: "conversed with", gerund: "conversing with" },
    { singular: "covers", regular: "cover", past: "covered", gerund: "covering" },
    { singular: "eats", regular: "eat", past: "ate", gerund: "eating" },
    { singular: "enters", regular: "enter", past: "entered", gerund: "entering" },
    { singular: "fights", regular: "fight", past: "fought", gerund: "fighting" },
    { singular: "goes to", regular: "go to", past: "went to", gerund: "going to" },
    { singular: "grinds", regular: "grind", past: "ground", gerund: "grinding" },
    { singular: "has", regular: "have", past: "had", gerund: "having" },
    { singular: "hates", regular: "hate", past: "hated", gerund: "hating" },
    { singular: "hits", regular: "hit", past: "hit", gerund: "hitting" },
    { singular: "hurts", regular: "hurt", past: "hurt", gerund: "hurting" },
    { singular: "imagines", regular: "imagine", past: "imagined", gerund: "imagining" },
    { singular: "kills", regular: "kill", past: "killed", gerund: "killing" },
    { singular: "licks", regular: "lick", past: "licked", gerund: "licking" },
    { singular: "likes", regular: "like", past: "liked", gerund: "liking" },
    { singular: "loves", regular: "love", past: "loved", gerund: "loving" },
    { singular: "neglects", regular: "neglect", past: "neglected", gerund: "neglecting" },
    { singular: "sees", regular: "see", past: "saw", participle: "seen", gerund: "seeing" },
    { singular: "smacks", regular: "smack", past: "smacked", gerund: "smacking" },
    { singular: "speaks with", regular: "speak with", past: "spoke with", gerund: "speaking with" },
    { singular: "tackles", regular: "tackle", past: "tackled", gerund: "tackling" },
    { singular: "talks to", regular: "talk to", past: "talked to", gerund: "talking to" },
    { singular: "tickles", regular: "tickle", past: "tickled", gerund: "tickling" },
];

const intransitiveVerbs: Verb[] = [
    { singular: "apologizes", regular: "apologize", past: "apologized", gerund: "apologizing" },
    { singular: "approves", regular: "approve", past: "approved", gerund: "approving" },
    { singular: "beeps", regular: "beep", past: "beeped", gerund: "beeping" },
    { singular: "burns", regular: "burn", past: "burned", gerund: "burning" },
    { singular: "chops", regular: "chop", past: "chopped", gerund: "chopping" },
    { singular: "coughs", regular: "cough", past: "coughed", gerund: "coughing" },
    { singular: "dances", regular: "dance", past: "danced", gerund: "dancing" },
    { singular: "dies", regular: "die", past: "died", gerund: "dying" },
    { singular: "fails", regular: "fail", past: "failed", gerund: "failing" },
    { singular: "falls", regular: "fall", past: "fell", gerund: "falling" },
    { singular: "goes away", regular: "go away", past: "went away", gerund: "going away" },
    { singular: "goes", regular: "go", past: "went", gerund: "going" },
    { singular: "kills", regular: "kill", past: "killed", gerund: "killing" },
    { singular: "knows", regular: "know", past: "knew", participle: "known", gerund: "knowing" },
    { singular: "leaps", regular: "leap", past: "leapt", gerund: "leaping" },
    { singular: "left", regular: "leave", past: "left", gerund: "leaving" },
    { singular: "lies", regular: "lie", past: "lied", gerund: "lying" },
    { singular: "reacts", regular: "react", past: "reacted", gerund: "reacting" },
    { singular: "runs", regular: "run", past: "ran", gerund: "running" },
    { singular: "sings", regular: "sing", past: "sang", participle: "sung", gerund: "singing" },
    { singular: "speaks", regular: "speak", past: "spoke", gerund: "speaking" },
    { singular: "squats", regular: "squat", past: "squat", gerund: "squatting" },
    { singular: "struggles", regular: "struggle", past: "struggled", gerund: "struggling" },
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

function spaceModifier(modifier: string | undefined, firstSpace: boolean = true) {
    if (firstSpace) {
        return modifier ? ` ${modifier} ` : " ";
    } else {
        return modifier ? `${modifier} ` : "";
    }
}

// Transitive generators

function presentVerb(verbCollection: VerbCollection, plurality: Plurality, modifier: string | undefined) {
    switch (plurality) {
        case "singular": return `${spaceModifier(modifier, false)}${randomElement(verbCollection.singular)}`;
        case "plural": return `${spaceModifier(modifier, false)}${randomElement(verbCollection.regular)}`;
    }
}

function preteriteVerb(verbCollection: VerbCollection, plurality: Plurality, modifier: string | undefined) {
    return `${spaceModifier(modifier, false)}${randomElement(verbCollection.past)}`;
}

function presentContinuousVerb(verbCollection: VerbCollection, plurality: Plurality, modifier: string | undefined) {
    switch (plurality) {
        case "singular": return `is${spaceModifier(modifier)}${randomElement(verbCollection.gerund)}`;
        case "plural": return `are${spaceModifier(modifier)}${randomElement(verbCollection.gerund)}`;
    }
}

function presentPerfectVerb(verbCollection: VerbCollection, plurality: Plurality, modifier: string | undefined) {
    switch (plurality) {
        case "singular": return `has${spaceModifier(modifier)}${randomElement(verbCollection.participle)}`;
        case "plural": return `have${spaceModifier(modifier)}${randomElement(verbCollection.participle)}`;
    }
}

function futureVerb(verbCollection: VerbCollection, plurality: Plurality, modifier: string | undefined) {
    const prefix = futurePrefix();
    return `${prefix}${spaceModifier(modifier)}${randomElement(verbCollection.regular)}`;
}

function futurePerfectVerb(verbCollection: VerbCollection, plurality: Plurality, modifier: string | undefined) {
    const prefix = futurePrefix();
    return `${prefix}${spaceModifier(modifier)}${randomElement(verbCollection.regular)}`;
}

function pastContinuous(verbCollection: VerbCollection, plurality: Plurality, modifier: string | undefined) {
    switch (plurality) {
        case "singular": return `was${spaceModifier(modifier)}${randomElement(verbCollection.gerund)}`;
        case "plural": return `were${spaceModifier(modifier)}${randomElement(verbCollection.gerund)}`;
    }
}

function pastPerfect(verbCollection: VerbCollection, plurality: Plurality, modifier: string | undefined) {
    return `had${spaceModifier(modifier)}${randomElement(verbCollection.participle)}`;
}

function futureContinuous(verbCollection: VerbCollection, plurality: Plurality, modifier: string | undefined) {
    return `will be${spaceModifier(modifier)}${randomElement(verbCollection.gerund)}`;
}

function presentPerfectContinuous(verbCollection: VerbCollection, plurality: Plurality, modifier: string | undefined) {
    switch (plurality) {
        case "singular": return `has been${spaceModifier(modifier)}${randomElement(verbCollection.gerund)}`;
        case "plural": return `have been${spaceModifier(modifier)}${randomElement(verbCollection.gerund)}`;
    }
}

function pastPerfectContinuous(verbCollection: VerbCollection, plurality: Plurality, modifier: string | undefined) {
    return `had been${spaceModifier(modifier)}${randomElement(verbCollection.gerund)}`;
}

function futurePerfectContinuous(verbCollection: VerbCollection, plurality: Plurality, modifier: string | undefined) {
    return `will have been${spaceModifier(modifier)}${randomElement(verbCollection.gerund)}`;
}

function verbAnyTense(verbCollection: VerbCollection, plurality: Plurality, modifier: string | undefined) {
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
    ])(verbCollection, plurality, modifier);
}

function imperative(verbCollection: VerbCollection, modifier: string | undefined) {
    return `${spaceModifier(modifier, false)}${randomElement(verbCollection.regular)}`;
}

export function transitiveSingularVerbAnyTense(modifier: string | undefined) {
    return verbAnyTense(transitive, "singular", modifier);
}

export function transitivePluralVerbAnyTense(modifier: string | undefined) {
    return verbAnyTense(transitive, "plural", modifier);
}

export function transitiveVerbImperative(modifier: string | undefined) {
    return imperative(transitive, modifier);
}

export function intransitiveSingularVerbAnyTense(modifier: string | undefined) {
    return verbAnyTense(intransitive, "singular", modifier);
}

export function intransitivePluralVerbAnyTense(modifier: string | undefined) {
    return verbAnyTense(intransitive, "plural", modifier);
}

export function intransitiveVerbImperative(modifier: string | undefined) {
    return imperative(intransitive, modifier);
}
