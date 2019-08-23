import { Message } from "discord.js";

export function sentence(message: Message) {
    const { content } = message;

    if (!content.match(/sentence/)) { return; }

    message.channel.send("Emma is pretty great!");
    return true;
}
