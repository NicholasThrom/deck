import { subordinatingConjunction } from "./conjunctions";
import { independentClause } from "./independent-clause";

export function subordinateClause() {
    return `${subordinatingConjunction()} ${independentClause()}`;
}
