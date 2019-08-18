import { Message } from "discord.js";
import { randomElement } from "../../../utils/random";
import { addQuestion } from "../../questions";
import { questionUntilAnswered } from "../../questions/question-factories";

const items = [
    "deck",
    "duck",
    "squid",
    "deck builder",
    "wow",
];

export async function questionTester(message: Message) {
    const { content } = message;

    if (!content.match(/questiontest/i)) { return; }

    const item = randomElement(items);

    await message.reply(`Please say "${item}"`);

    addQuestion(questionUntilAnswered(async (message: Message) => {
        if (!message.content.toLowerCase().includes(item)) { return; }

        await message.reply("Thank you for complying.");
        return true;
    }));

    return true;
}
