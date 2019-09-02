import { randomElement } from "../../../../../utils/random";

const nouns = [
    { singular: "ant", plural: "ants" },
    { singular: "bin", plural: "bins" },
    { singular: "bologna", plural: "bolognas" },
    { singular: "bone", plural: "bones" },
    { singular: "book", plural: "books" },
    { singular: "box", plural: "boxes" },
    { singular: "boy", plural: "boys" },
    { singular: "car", plural: "cars" },
    { singular: "cat", plural: "cats" },
    { singular: "chair", plural: "chairs" },
    { singular: "chalk brush", plural: "chalk brushes" },
    { singular: "classroom", plural: "classrooms" },
    { singular: "closet", plural: "closets" },
    { singular: "college", plural: "colleges" },
    { singular: "cow", plural: "cows" },
    { singular: "desk", plural: "desks" },
    { singular: "ditch", plural: "ditches" },
    { singular: "dog", plural: "dogs" },
    { singular: "duck", plural: "ducks" },
    { singular: "empty coffee cup", plural: "empty coffee cups" },
    { singular: "file", plural: "files" },
    { singular: "fly", plural: "flies" },
    { singular: "game", plural: "games" },
    { singular: "girl", plural: "girls" },
    { singular: "hair", plural: "hairs" },
    { singular: "joke", plural: "jokes" },
    { singular: "lemon", plural: "lemons" },
    { singular: "mountain", plural: "mountains" },
    { singular: "mouse trap", plural: "mouse traps" },
    { singular: "mouse", plural: "mice" },
    { singular: "murderer", plural: "murderers" },
    { singular: "object", plural: "objects" },
    { singular: "officer", plural: "officers" },
    { singular: "pepperoni", plural: "pepperonis" },
    { singular: "phone", plural: "phones" },
    { singular: "piece of paper", plural: "pieces of paper" },
    { singular: "pig", plural: "pigs" },
    { singular: "plane", plural: "planes" },
    { singular: "policeman", plural: "policemen" },
    { singular: "road", plural: "roads" },
    { singular: "ruler", plural: "rulers" },
    { singular: "sadness" },
    { singular: "slice of cheese", plural: "slices of cheese" },
    { singular: "teacher", plural: "teachers" },
    { singular: "toaster", plural: "toasters" },
    { singular: "tower", plural: "towers" },
    { singular: "tree", plural: "trees" },
    { singular: "wheel", plural: "wheels" },
    { singular: "word", plural: "words" },
];

const singularNouns = nouns.map((noun) => noun.singular).filter((n): n is string => n !== undefined);
const pluralNouns = nouns.map((noun) => noun.plural).filter((n): n is string => n !== undefined);

export function singularNoun(): string {
    return randomElement(singularNouns);
}

export function pluralNoun(): string {
    return randomElement(pluralNouns);
}
