import { Message } from "discord.js";
import { chance, randomElement } from "../../../utils/random";
import { randomSentence } from "./sentence-generator/sentence-generator";

const responses = [
    "dekt!",
    "get dekt!",
    "You get a deck!",
    "Deckémon, gotta build em all!",
    "no deck for you :(",
];

export function decker(message: Message) {
    const { content } = message;

    if (!content.match(/deck/i)) { return; }
    if (chance(0.3)) {
        message.channel.send(randomElement(responses));
    } else if (chance(0.1)) {
        message.channel.send(randomSentence());
    }
    return true;
}
