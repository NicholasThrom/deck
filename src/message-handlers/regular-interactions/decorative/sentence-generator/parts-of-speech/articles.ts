import * as indefiniteUntyped from "indefinite";
import { weightedRandomElement } from "../../../../../utils/random";
import { describedThing } from "./adjective";
import { pluralNoun, singularNoun } from "./nouns";

const indefinite = indefiniteUntyped as unknown as (string: string) => string;

export function articledThing() {
    return weightedRandomElement([
        [2, () => `the ${describedThing(singularNoun())}`],
        [2, () => `${indefinite(describedThing(singularNoun()))}`],
        [1, () => `this ${describedThing(singularNoun())}`],
        [1, () => `that ${describedThing(singularNoun())}`],
    ])();
}

export function articledThings() {
    return weightedRandomElement([
        [2, () => `the ${describedThing(pluralNoun())}`],
        [2, () => `${describedThing(pluralNoun())}`],
        [1, () => `these ${describedThing(pluralNoun())}`],
        [1, () => `those ${describedThing(pluralNoun())}`],
    ])();
}
