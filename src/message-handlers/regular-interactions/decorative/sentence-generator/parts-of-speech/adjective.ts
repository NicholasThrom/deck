import { randomElement } from "../../../../../utils/random";

const adjectives = [
    "angry",
    "bad",
    "cool",
    "dastardly",
    "dead",
    "funny",
    "good",
    "green",
    "helpful",
    "orange",
    "purple",
    "red",
    "relatable",
    "sad",
    "smelly",
    "sneaky",
    "tall",
    "yellow",
];

export function adjective() {
    return randomElement(adjectives);
}
