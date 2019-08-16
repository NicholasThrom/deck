import { Message } from "discord.js";
import { randomElement, randomIn } from "../../../utils/random";

let health = 1000;
let hits = 0;

export function attack(message: Message) {
    const { content } = message;

    if (!content.match(/attack/i)) { return; }

    health -= Math.floor(randomIn(10, 400));
    hits++;
    if (health > 0) {
        if (health < 10) {
            message.reply(`${health} hp remaining! big oof.`);
        } else if (health < 50) {
            message.reply(`${health} hp remaining! oof.`);
        } else {
            const responses = [
                `${health} hp remaining!`,
                `${health} hp remaining!`,
                `${health} hp remaining!`,
                `${health} hp remaining!`,
                `${health} hp remaining! ${hits} hit${hits > 1 ? "s" : ""} so far!`,
                `${health} hp remaining! ${hits} hit${hits > 1 ? "s" : ""} so far!`,
                `oh shoot I'm down to ${health} hp.`,
                `Oh deck! I'm down to ${health} hp.`,
            ];
            message.reply(randomElement(responses));
        }
    } else {
        const responses = [
            `decKO! in ${hits} hits!`,
            `I just got dekt in ${hits} hits!`,
            `I've been decked! It took ${hits} hits!`,
            `I'm out! You win a deck! It only took you ${hits} hits!`,
            `I got deckstroyed! Only ${hits} hits!`,
            `In ${hits} hits I was brought down to the deck!`,
            `I'm all decked out. Only took ${hits} hits.`,
            `I'm lying on the deck, defeated. It took ${hits} hits.`,
            `I've been deckfeated in ${hits} hits.`,
            `Decked! ${hits} hits.`,
        ];
        message.reply(randomElement(responses));
        health = 1000;
        hits = 0;
    }
    return true;
}
