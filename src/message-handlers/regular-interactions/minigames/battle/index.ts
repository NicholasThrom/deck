import { sequence } from "../../../../utils/sequencer";
import { attack } from "./commands/attack";
import { heal } from "./commands/heal";
import { run } from "./commands/run";
import { stats } from "./commands/stats";

export const battle = sequence([
    attack,
    heal,
    run,
    stats,
]);
