import { Message } from "discord.js";
import { randomSentence } from "./sentence-generator";

export function sentence(message: Message) {
    const { content } = message;

    const match = content.match(/sentence|speak|advice|help|say|said(?: (\d+))?/);

    if (!match) { return; }

    let count = parseInt(match[1], 10) || 1;
    if (count > 20) { count = 20; }

    const sentences = [];
    for (let i = 0; i < count; i++) { sentences.push(randomSentence()); }

    message.channel.send(sentences.join("\n"));

    return true;
}
