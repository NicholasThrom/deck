import { Message } from "discord.js";
import { chance, randomElement } from "../../../utils/random";

const responses = [
    "no prob!",
    "no problem!",
    "no problemo!",
    "no worries!",
    "glad to help!",
    "sure thing!",
    "you're welcome!",
    "thank yourself, loser",
];

export function thanker(message: Message) {
    const { content } = message;

    if (!content.match(/thank(?:s?| +you)/)) { return; }

    if (chance(0.8)) { return; }

    message.reply(randomElement(responses));
    return true;
}
