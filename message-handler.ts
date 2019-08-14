import { Client, Message } from "discord.js";
import { chance, randomElement, randomIn } from "./util";

function delay(time: number): Promise<undefined> {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

async function process(
    message: Message,
    functions: ((message: Message) => Promise<boolean | undefined> | boolean | undefined | void)[],
) {
    for (const func of functions) {
        const result = await func(message);
        if (result) { return; }
    }
}

export async function handleMessage(client: Client, message: Message) {
    if (message.author.equals(client.user)) {
        return;
    }

    await delay(500);

    await process(message, [
        deckDealer,
        play,
        thanker,
        decker,
        attack,
    ]);
}

function deckDealer(message: Message) {
    delay(randomIn(10000, 10000000)).then(() => {
        const responses = [
            "wanna buy a deck?",
            "psst... wanna buy a deck?",
            "hey, wanna buy a deck?",
            "hey, could I interest you in some decks?",
            "you looking for some decks?",
            "hey, you looking for some decks?",
        ];
        message.reply(randomElement(responses));
    });
}

async function thanker(message: Message) {
    const { content } = message;

    if (content.match(/thank(s?| +you)/)) {
        const responses = [
            "no prob!",
            "no problem!",
            "no problemo!",
            "no worries!",
            "glad to help!",
            "sure thing!",
            "you're welcome!",
            "thank yourself, loser",
        ];
        message.reply(randomElement(responses));
        return true;
    }
}

async function decker(message: Message) {
    const { content } = message;

    if (content.match(/deck/i)) {
        const responses = [
            "dekt!",
            "get dekt!",
            "You get a deck!",
            "Deckémon, gotta build em all!",
            "no deck for you :(",
        ];
        message.reply(randomElement(responses));
        return true;
    }
}

async function play(message: Message) {
    const { content } = message;

    const match = content.match(/!play (.*)/i);
    if (match) {
        const name = match[1];
        message.reply(`${name} has been put on the playing deck!`);
        if (chance(0.8)) {
            const responses = [
                `${name} was one of my childhood favourites.`,
                `${name} is such a good song.`,
                `${name} is my favourite.`,
                `${name} is a bop.`,
                `${name} is so good.`,
                `Turn up for ${name}.`,
                `Let's listen ${name} repeatedly until we hate it.`,
                `${name} is kinda bad tbh.`,
            ];
            message.channel.send(randomElement(responses));
            return true;
        }
        return true;
    }
}

let health = 1000;
let hits = 0;

function attack(message: Message) {
    const { content } = message;

    if (content.match(/attack/i)) {
        health -= Math.floor(randomIn(10, 400));
        hits++;
        if (health > 0) {
            const responses = [
                `${health} hp remaining!`,
                `${health} hp remaining!`,
                `${health} hp remaining!`,
                `${health} hp remaining! ${hits} hit ${hits > 1 ? "s" : ""} so far!`,
                `oh shoot I'm down to ${health} hp.`,
            ];
            message.reply(randomElement(responses));
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
}
