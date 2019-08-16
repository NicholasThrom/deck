import { chance, randomElement } from "../../../../utils/random";

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
    public criesOfDespair: string[];
    public deathMessages: string[];
    public winMessages: string[];
    public health: number;
    public chanceOfCrying: number;
    public chanceOfDeathMessage: number;
    public chanceOfWinMessage: number;

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

    public healthNotification() {
        return `${this.name} has ${this.health}/${this.maxHealth} hp remaining.`;
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
