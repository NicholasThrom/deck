import { Message } from "discord.js";
import { Question } from "./questions";

/**
 * Returns a question that persists until it is answered.
 */
export function questionUntilAnswered(question: (message: Message) => boolean | undefined | void): Question {
    return (message: Message) => {
        const result = question(message);
        return { shouldRemove: result, responded: result };
    };
}
