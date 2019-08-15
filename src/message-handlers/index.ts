import { Client, Message } from "discord.js";
import { delay } from "../utils/async";
import { sequence } from "../utils/sequencer";
import { attack } from "./attack";
import { deckDealer } from "./deck-dealer";
import { decker } from "./decker";
import { play } from "./play";
import { thanker } from "./thanker";

export async function handleMessage(client: Client, message: Message) {
    if (message.author.equals(client.user)) {
        return;
    }

    await delay(400);

    await sequence([
        deckDealer,
        play,
        thanker,
        decker,
        attack,
    ])(message);
}
