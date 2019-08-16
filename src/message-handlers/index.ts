import { Client, Message } from "discord.js";
import { delay } from "../utils/async";
import { sequence } from "../utils/sequencer";
import { handleQuestionResponse } from "./questions";
import { deckDealer } from "./regular-interactions/decorative/deck-dealer";
import { decker } from "./regular-interactions/decorative/decker";
import { play } from "./regular-interactions/decorative/play";
import { thanker } from "./regular-interactions/decorative/thanker";
import { attack } from "./regular-interactions/minigames/battle/attack";
import { quietGame } from "./regular-interactions/minigames/quiet-game";
import { questionTester } from "./regular-interactions/tests/question-tester";

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
