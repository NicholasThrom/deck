import { Message } from "discord.js";
import { randomElement } from "../utils/random";
import { questionUntilAnswered } from "./questions/question-factories";
import { addQuestion } from "./questions/questions";

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

    message.reply(`Please say "${item}"`);

    addQuestion(questionUntilAnswered((message: Message) => {
        if (!message.content.toLowerCase().includes(item)) { return; }

        message.reply("Thank you for complying.");
        return true;
    }));

    return true;
}