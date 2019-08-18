import { Message } from "discord.js";
import { randomElement } from "../../../utils/random";

const responses = [
    "dekt!",
    "get dekt!",
    "You get a deck!",
    "Deckémon, gotta build em all!",
    "no deck for you :(",
];

export async function decker(message: Message) {
    const { content } = message;

    if (!content.match(/deck/i)) { return; }
    await message.reply(randomElement(responses));
    return true;
}
