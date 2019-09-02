import { sentence } from "./parts-of-speech/sentence";
import { capitalizeFirstLetter } from "./util";

export function randomSentence() {
    return capitalizeFirstLetter(`${sentence()}.`);
}
