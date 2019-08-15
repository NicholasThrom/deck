import { Message } from "discord.js";
import { randomElement } from "../utils/random";

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

export async function thanker(message: Message) {
    const { content } = message;

    if (!content.match(/thank(?:s?| +you)/)) { return; }

    message.reply(randomElement(responses));
    return true;
}
