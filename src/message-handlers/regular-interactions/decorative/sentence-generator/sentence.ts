import { Message } from "discord.js";
import { chance } from "../../../../utils/random";
import { randomSentence } from "./sentence-generator";

export function sentence(message: Message) {
    const { content } = message;

    const match = content.match(/(sentence|speak|advice|help|say|said|what)(?: (\d+))?/);

    if (!match) { return; }

    if (match[1] !== "sentence" || chance(0.8)) { return; }

    let count = parseInt(match[2], 10) || 1;
    if (count > 20) { count = 20; }

    const sentences = [];
    for (let i = 0; i < count; i++) { sentences.push(randomSentence()); }

    message.channel.send(sentences.join("\n"));

    return true;
}
