import { weightedRandomElement } from "../../../../../utils/random";
import { independentClause } from "./independent-clause";
import { subordinateClause } from "./subordinate-clause";

export function sentence() {
    return weightedRandomElement([
        [8, independentClause],
        [2, () => `${independentClause()} ${subordinateClause()}`],
        [1, () => `${subordinateClause()}, ${independentClause()}`],
    ])();
}
