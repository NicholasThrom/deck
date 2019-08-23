import { Message } from "discord.js";
import { randomSentence } from "./parts-of-speech";

export function sentence(message: Message) {
    const { content } = message;

    if (!content.match(/sentence/)) { return; }

    message.channel.send(randomSentence());
    return true;
}
