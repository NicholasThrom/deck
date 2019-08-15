import { Message } from "discord.js";

/**
 * Represents an action based on a specific question asked.
 *
 * Returns if the question should be kept around,
 * and if it has been responded to.
 */
export type Question =
    (message: Message) => {
        shouldRemove: boolean | undefined | void, responded: boolean | undefined | void,
    };

/**
 * The questions that are currently active.
 */
const activeQuestions: Question[] = [];

/**
 * Adds a question to the active questions queue.
 */
export function addQuestion(question: Question) {
    activeQuestions.push(question);
}

/**
 * Responds to the questions that exist.
 */
export function handleQuestionResponse(message: Message) {
    for (let i = 0; i < activeQuestions.length; i++) {
        const { shouldRemove, responded } = activeQuestions[i](message);

        if (shouldRemove) {
            activeQuestions.splice(i, 1);
            i--;
        }

        if (responded) { return true; }
    }
}
