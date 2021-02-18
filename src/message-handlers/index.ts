import { Client, Message } from "discord.js";
import { sequence } from "../utils/sequencer";
import { handleQuestionResponse } from "./questions";
import { deckDealer } from "./regular-interactions/decorative/deck-dealer";
import { decker } from "./regular-interactions/decorative/decker";
import { play } from "./regular-interactions/decorative/play";
import { sentence } from "./regular-interactions/decorative/sentence-generator/sentence";
import { thanker } from "./regular-interactions/decorative/thanker";
import { wellerman } from "./regular-interactions/decorative/wellerman";
import { battle } from "./regular-interactions/minigames/battle";
import { quietGame } from "./regular-interactions/minigames/quiet-game";
import { questionTester } from "./regular-interactions/tests/question-tester";

export async function handleMessage(client: Client, message: Message) {
    const user = client.user;
    if (!user) { return false; }
    if (message.author.equals(user)) { return; }

    await sequence([

        // Listeners
        deckDealer,

        // Question handling
        handleQuestionResponse,

        // Regular handlers
        play,
        thanker,
        decker,
        wellerman,
        sentence,
        battle,
        quietGame,
        questionTester,

    ])(message);
}
