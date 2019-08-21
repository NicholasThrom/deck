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

export function questionTester(message: Message) {
    const { content } = message;

    if (!content.match(/questiontest/i)) { return; }

    const item = randomElement(items);

    message.reply(`Please say "${item}"`);

    addQuestion(questionUntilAnswered(async (message: Message) => {
        if (!message.content.toLowerCase().includes(item)) { return; }

        message.reply("Thank you for complying.");
        return true;
    }));

    return true;
}
