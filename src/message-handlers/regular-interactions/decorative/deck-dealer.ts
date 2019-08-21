import { Message } from "discord.js";
import { delay } from "../../../utils/async";
import { randomElement, randomIn } from "../../../utils/random";

export function deckDealer(message: Message) {
    // Intentionally floating,
    // so that other responses don't need to wait so long.
    // tslint:disable-next-line no-floating-promises
    delay(randomIn(10000, 10000000)).then(async () => {
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
