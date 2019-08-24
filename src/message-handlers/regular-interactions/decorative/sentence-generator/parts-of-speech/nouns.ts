import { randomElement } from "../../../../../utils/random";

interface Noun {
    singular: string;
    plural: string;
}

export function nouns(): Noun {
    return randomElement([
        { singular: "dog", plural: "dogs" },
        { singular: "cat", plural: "cats" },
        { singular: "mouse", plural: "mice" },
        { singular: "slice of cheese", plural: "slices of cheese" },
        { singular: "mountain", plural: "mountains" },
        { singular: "tree", plural: "trees" },
        { singular: "ant", plural: "ants" },
        { singular: "fly", plural: "flies" },
        { singular: "piece of paper", plural: "pieces of paper" },
        { singular: "empty coffee cup", plural: "empty coffee cups" },
        { singular: "mouse trap", plural: "mouse traps" },
        { singular: "pepperoni", plural: "pepperonis" },
        { singular: "tower", plural: "towers" },
        { singular: "desk", plural: "desks" },
        { singular: "chair", plural: "chairs" },
        { singular: "object", plural: "objects" },
        { singular: "car", plural: "cars" },
        { singular: "girl", plural: "girls" },
        { singular: "boy", plural: "boys" },
        { singular: "wheel", plural: "wheels" },
        { singular: "game", plural: "games" },
        { singular: "joke", plural: "jokes" },
        { singular: "ditch", plural: "ditches" },
        { singular: "road", plural: "roads" },
        { singular: "word", plural: "words" },
        { singular: "book", plural: "books" },
        { singular: "hair", plural: "hairs" },
        { singular: "bone", plural: "bones" },
        { singular: "murderer", plural: "murderers" },
        { singular: "teacher", plural: "teachers" },
        { singular: "chalk brush", plural: "chalk brushes" },
        { singular: "ruler", plural: "rulers" },
        { singular: "classroom", plural: "classrooms" },
    ]);
}
