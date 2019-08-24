import * as indefiniteUntyped from "indefinite";
import { randomElement, weightedRandomElement } from "../../../../utils/random";
import { capitalizeFirstLetter } from "./util";

const indefinite = indefiniteUntyped as unknown as (string: string) => string;

export function randomSentence() {
    return capitalizeFirstLetter(`${randomElement([
        description,
        subjectlessAction,
        subjectedAction,
    ])()}.`);
}

function thing() {
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

function things() {
    return randomElement([
        "dogs",
        "cats",
        "mice",
        "slices of cheese",
        "mountains",
        "trees",
        "ants",
        "flies",
        "pieces of paper",
        "empty coffee cups",
        "mouse traps",
        "towers",
        "desks",
        "chairs",
        "objects",
        "cars",
        "girls",
        "boys",
        "wheels",
        "games",
        "jokes",
        "ditches",
        "roads",
        "words",
        "books",
        "bones",
        "murderers",
        "teachers",
        "chalk brushes",
        "rulers",
        "classrooms",
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

const verbs = {
    subjectless: {
        singular: {
            anyTense() {
                return randomElement([
                    verbs.subjectless.singular.past,
                    verbs.subjectless.singular.present,
                    verbs.subjectless.singular.future,
                ])();
            },
            present() {
                return randomElement([
                    "runs",
                    "dies",
                    "falls",
                    "lies",
                    "speaks",
                    "thinks",
                    "talks",
                    "beeps",
                    "sings",
                    "writes",
                ]);
            },
            past() {
                return randomElement([
                    "ran",
                    "died",
                    "fell",
                    "lied",
                    "spoke",
                    "thought",
                    "talked",
                    "beeped",
                    "sang",
                    "wrote",
                ]);
            },
            future() {
                const modifier = weightedRandomElement([
                    [3, "will"],
                    [1, "shall"],
                ]);
                return randomElement([
                    `${modifier} run`,
                    `${modifier} die`,
                    `${modifier} fall`,
                    `${modifier} lie`,
                    `${modifier} speak`,
                    `${modifier} think`,
                    `${modifier} talk`,
                    `${modifier} beep`,
                    `${modifier} sing`,
                    `${modifier} write`,
                ]);
            },
        },
        plural: {
            anyTense() {
                return randomElement([
                    verbs.subjectless.plural.past,
                    verbs.subjectless.plural.present,
                    verbs.subjectless.plural.future,
                ])();
            },
            present() {
                return randomElement([
                    "run",
                    "die",
                    "fall",
                    "lie",
                    "speak",
                    "think",
                    "talk",
                    "beep",
                    "sing",
                    "write",
                ]);
            },
            past() {
                return randomElement([
                    "ran",
                    "died",
                    "fell",
                    "lied",
                    "spoke",
                    "thought",
                    "talked",
                    "beeped",
                    "sang",
                    "wrote",
                ]);
            },
            future() {
                const modifier = weightedRandomElement([
                    [3, "will"],
                    [1, "shall"],
                ]);
                return randomElement([
                    `${modifier} run`,
                    `${modifier} die`,
                    `${modifier} fall`,
                    `${modifier} lie`,
                    `${modifier} speak`,
                    `${modifier} think`,
                    `${modifier} talk`,
                    `${modifier} beep`,
                    `${modifier} sing`,
                    `${modifier} write`,
                ]);
            },
        },
    },
    subjected: {
        singular: {
            anyTense() {
                return randomElement([
                    verbs.subjected.singular.past,
                    verbs.subjected.singular.present,
                    verbs.subjected.singular.future,
                ])();
            },
            present() {
                return randomElement([
                    "hits",
                    "talks to",
                    "considers",
                    "speaks with",
                    "kills",
                    "eats",
                    "licks",
                    "converses with",
                    "loves",
                    "likes to eat",
                ]);
            },
            past() {
                return randomElement([
                    "hit",
                    "talked to",
                    "considered",
                    "spoke with",
                    "killed",
                    "ate",
                    "lick",
                    "conversed with",
                    "loved",
                ]);
            },
            future() {
                const modifier = weightedRandomElement([
                    [3, "will"],
                    [1, "shall"],
                ]);
                return randomElement([
                    `${modifier} hit`,
                    `${modifier} talk to`,
                    `${modifier} consider`,
                    `${modifier} speak with`,
                    `${modifier} kill`,
                    `${modifier} eat`,
                    `${modifier} lick`,
                    `${modifier} converse with`,
                    `${modifier} love`,
                    `${modifier} like to eat`,
                ]);
            },
        },
        plural: {
            anyTense() {
                return randomElement([
                    verbs.subjected.singular.past,
                    verbs.subjected.singular.present,
                    verbs.subjected.singular.future,
                ])();
            },
            present() {
                return randomElement([
                    "hit",
                    "talk to",
                    "consider",
                    "speak with",
                    "kill",
                    "eat",
                    "lick",
                    "converse with",
                    "love",
                    "like to eat",
                ]);
            },
            past() {
                return randomElement([
                    "hit",
                    "talked to",
                    "considered",
                    "spoke with",
                    "killed",
                    "ate",
                    "lick",
                    "conversed with",
                    "loved",
                ]);
            },
            future() {
                const modifier = weightedRandomElement([
                    [3, "will"],
                    [1, "shall"],
                ]);
                return randomElement([
                    `${modifier} hit`,
                    `${modifier} talk to`,
                    `${modifier} consider`,
                    `${modifier} speak with`,
                    `${modifier} kill`,
                    `${modifier} eat`,
                    `${modifier} lick`,
                    `${modifier} converse with`,
                    `${modifier} love`,
                    `${modifier} like to eat`,
                ]);
            },
        },
    },
};

function described(thing: () => string): string {
    return weightedRandomElement([
        [2, thing],
        [1, () => `${descriptor()} ${described(thing)}`],
    ])();
}

function articledThing() {
    return weightedRandomElement([
        [2, () => `the ${described(thing)}`],
        [2, () => `${indefinite(described(thing))}`],
        [1, () => `this ${described(thing)}`],
        [1, () => `that ${described(thing)}`],
    ])();
}

function articledThings() {
    return weightedRandomElement([
        [2, () => `the ${described(things)}`],
        [2, () => `${described(things)}`],
        [1, () => `these ${described(things)}`],
        [1, () => `those ${described(things)}`],
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

function subjectlessAction() {
    return randomElement([
        () => `${articledThing()} ${verbs.subjectless.singular.anyTense()}`,
        () => `${articledThings()} ${verbs.subjectless.plural.anyTense()}`,
    ])();
}

function subjectedAction() {
    return randomElement([
        () => `${articledThing()} ${verbs.subjected.singular.anyTense()} ${randomElement([articledThings, articledThing])()}`,
        () => `${articledThings()} ${verbs.subjected.plural.anyTense()} ${randomElement([articledThings, articledThing])()}`,
    ])();
}
