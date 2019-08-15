import { Message } from "discord.js";
import { Question } from ".";

/**
 * Returns a question that never expires.
 */
export function questionForever(question: (message: Message) => boolean | undefined | void): Question {
    return (message: Message) => {
        const result = question(message);
        return { shouldRemove: false, responded: result };
    };
}

/**
 * Returns a question that persists until it is answered.
 */
export function questionUntilAnswered(question: (message: Message) => boolean | undefined | void): Question {
    return (message: Message) => {
        const result = question(message);
        return { shouldRemove: result, responded: result };
    };
}

/**
 * Returns a question that expires after some amount of time.
 */
export function questionWithExpiration(
    timeToExpiry: number,
    question: Question,
): Question {
    const expiryTime = new Date().getTime() + timeToExpiry;
    return (message: Message) => {
        if (new Date().getTime() > expiryTime) {
            return { shouldRemove: true, responded: false };
        }

        return question(message);
    };
}

/**
 * Returns a question that exists until expired on answered.
 */
export function questionUntilExpiredOrAnswered(
    timeToExpiry: number,
    question: (message: Message) => boolean | undefined | void,
): Question {
    return questionWithExpiration(timeToExpiry, questionUntilAnswered(question));
}

/**
 * Returns a question that lasts until it is expired, and repeats otherwise.
 */
export function questionUntilExpired(
    timeToExpiry: number,
    question: (message: Message) => boolean | undefined | void,
): Question {
    return questionWithExpiration(timeToExpiry, questionForever(question));
}
