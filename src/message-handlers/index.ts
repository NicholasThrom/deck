import { Client, Message } from "discord.js";
import { delay } from "../utils/async";
import { sequence } from "../utils/sequencer";
import { handleQuestionResponse } from "./questions";
import { attack } from "./regular-interactions/attack";
import { deckDealer } from "./regular-interactions/deck-dealer";
import { decker } from "./regular-interactions/decker";
import { play } from "./regular-interactions/play";
import { questionTester } from "./regular-interactions/question-tester";
import { quietGame } from "./regular-interactions/quiet-game";
import { thanker } from "./regular-interactions/thanker";

export async function handleMessage(client: Client, message: Message) {
    if (message.author.equals(client.user)) { return; }

    await delay(400);

    await sequence([

        // Listeners
        deckDealer,

        // Question handling
        handleQuestionResponse,

        // Regular handlers
        play,
        thanker,
        decker,
        attack,
        quietGame,
        questionTester,

    ])(message);
}
