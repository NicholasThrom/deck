import * as pluralize from "pluralize";
import { chance, randomElement } from "../../../../../utils/random";
import { bar } from "../../../../../utils/strings/bar";
import { box } from "../../../../../utils/strings/box";

export interface EnemyInitializer {
    name: string;
    maxHealth: number;
    criesOfDespair: string[];
    deathMessages: string[];
    winMessages: string[];
    health?: number;
    chanceOfCrying?: number;
    chanceOfDeathMessage?: number;
    chanceOfWinMessage?: number;
}

const defaultChanceOfCrying = 0.4;
const defaultChanceOfDeathMessage = 1.0;
const defaultChanceOfWinMessage = 1.0;

/**
 * Represents an enemy that can be fought.
 */
export class Enemy {

    public readonly name: string;
    public readonly maxHealth: number;
    public readonly criesOfDespair: readonly string[];
    public readonly deathMessages: readonly string[];
    public readonly winMessages: readonly string[];
    public readonly chanceOfCrying: number;
    public readonly chanceOfDeathMessage: number;
    public readonly chanceOfWinMessage: number;

    public health: number;
    public hitCount = 0;

    public constructor({
        name,
        maxHealth,
        criesOfDespair,
        deathMessages,
        winMessages,
        health = maxHealth,
        chanceOfCrying = defaultChanceOfCrying,
        chanceOfDeathMessage = defaultChanceOfDeathMessage,
        chanceOfWinMessage = defaultChanceOfWinMessage,
    }: EnemyInitializer,
) {
        this.name = name;
        this.maxHealth = Math.floor(maxHealth);
        this.criesOfDespair = criesOfDespair;
        this.deathMessages = deathMessages;
        this.winMessages = winMessages;
        this.health = Math.floor(health);
        this.chanceOfCrying = chanceOfCrying;
        this.chanceOfDeathMessage = chanceOfDeathMessage;
        this.chanceOfWinMessage = chanceOfWinMessage;
    }

    public status() {
        return box(`**${this.name}** has been hit ${pluralize("time", this.hitCount, true)}.\n${this.healthBar()}`);
    }

    public healthBar() {
        return `${bar(this.health, this.maxHealth)} ${this.health}/${this.maxHealth} hp`;
    }

    public message(message: string) {
        return `**${this.name}**: "${message}"`;
    }

    public shouldCry(): boolean {
        return chance(this.chanceOfCrying);
    }

    public cryOfDespair() {
        return this.message(randomElement(this.criesOfDespair));
    }

    public shouldDeathMessage(): boolean {
        return chance(this.chanceOfDeathMessage);
    }

    public deathMessage(): string {
        return this.message(randomElement(this.deathMessages));
    }

    public shouldWinMessage(): boolean {
        return chance(this.chanceOfWinMessage);
    }

    public winMessage(): string {
        return this.message(randomElement(this.winMessages));
    }

    public isDead() {
        return this.health <= 0;
    }

    public damage(amount: number) {
        this.health = Math.max(Math.floor(this.health - amount), 0);
        this.hitCount++;
    }

}
