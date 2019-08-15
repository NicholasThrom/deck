import { Message } from "discord.js";
import { delay } from "../utils/async";
import { randomElement, randomIn } from "../utils/random";

export function deckDealer(message: Message) {
    delay(randomIn(10000, 10000000)).then(() => {
        const responses = [
            "wanna buy a deck?",
            "psst... wanna buy a deck?",
            "hey, wanna buy a deck?",
            "hey, could I interest you in some decks?",
            "you looking for some decks?",
            "hey, you looking for some decks?",
        ];
        message.reply(randomElement(responses));
    });
}
