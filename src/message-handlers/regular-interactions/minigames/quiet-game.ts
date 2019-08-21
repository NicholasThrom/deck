import { Message, User } from "discord.js";
import { delay } from "../../../utils/async";
import { randomElement } from "../../../utils/random";
import { addQuestion } from "../../questions";
import { questionUntilExpired } from "../../questions/question-factories";

const duration = 30000;
const durationString = "30 seconds";

export async function quietGame(message: Message) {
    const { content, channel } = message;

    if (!content.match(/quiet *game/i)) { return; }

    message.reply(`let's play the quiet game! For the next ${durationString}, anyone who speaks loses.`);

    const losers: User[] = [];

    addQuestion(questionUntilExpired(
        duration,
        async (message: Message) => {
            if (channel.id !== message.channel.id) { return; }

            if (losers.some((loser) => loser.equals(message.author))) { return; }

            const responses = [
                "you lose for speaking!",
                "you broke the silence! You lose!",
                "the silence was broken and now you must pay.",
                "you lose.",
                "you broke the silence.",
            ];

            message.reply(randomElement(responses));

            losers.push(message.author);

            return true;
        },
    ));

    await delay(duration);

    let loserString = "";

    if (losers.length === 0) {
        loserString = "Everyone wins!";
    } else if (losers.length === 1) {
        loserString = `Only ${losers[0]} lost.`;
    } else {
        loserString = `The users ${losers.slice(0, -1).join(", ")}, and ${losers.slice(-1)[0]} lost. :(`;
    }

    message.channel.send(`The quiet game has ended! ${loserString}`);

    return true;
}
