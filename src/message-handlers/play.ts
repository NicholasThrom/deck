import { Message } from "discord.js";
import { chance, randomElement } from "../utils/random";

export async function play(message: Message) {
    const { content } = message;

    const match = content.match(/!play(?:top)? (.*)/i);
    if (match) {
        const name = match[1];
        message.reply(`${name} has been put on the playing deck!`);
        if (chance(0.8)) {
            const responses = [
                `${name} was one of my childhood favourites.`,
                `${name} is such a good song.`,
                `${name} is my favourite.`,
                `${name} is a bop.`,
                `${name} is so good.`,
                `Turn up for ${name}.`,
                `Let's listen ${name} repeatedly until we hate it.`,
                `${name} is kinda bad tbh.`,
            ];
            message.channel.send(randomElement(responses));
            return true;
        }
        return true;
    }
}
