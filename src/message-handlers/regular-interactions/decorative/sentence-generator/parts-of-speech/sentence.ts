import { weightedRandomElement } from "../../../../../utils/random";
import { mainClause } from "./independent-clause";
import { subordinateClause } from "./subordinate-clause";

export function sentence(): string {
    return weightedRandomElement([
        [32, mainClause],
        [8, () => `${mainClause()} ${subordinateClause()}`],
        [4, () => `${subordinateClause()}, ${mainClause()}`],
        [2, () => `${sentence()} ${subordinateClause()}`],
        [1, () => `${subordinateClause()}, ${sentence()}`],
    ])();
}
