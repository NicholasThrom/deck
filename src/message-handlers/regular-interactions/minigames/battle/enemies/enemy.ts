import * as pluralize from "pluralize";
import { ElementOf } from "../../../../../utils/element-of";
import { chance, randomElement, randomIn, weightedRandomElement } from "../../../../../utils/random";
import { bar } from "../../../../../utils/strings/bar";
import { box } from "../../../../../utils/strings/box";

export interface EnemyInitializer {
    name: string;

    health?: number;
    maxHealth: number;

    strength?: number;
    defence?: number;
    variance?: number;

    missChanceWeight?: number;
    weakChanceWeight?: number;
    normalChanceWeight?: number;
    criticalChanceWeight?: number;
    missMultiplier?: number;
    weakHitMultiplier?: number;
    normalHitMultiplier?: number;
    criticalHitMultiplier?: number;

    criesOfDespair: string[];
    deathMessages: string[];
    winMessages: string[];
    chanceOfCrying?: number;
    chanceOfDeathMessage?: number;
    chanceOfWinMessage?: number;
}

const defaultStrength = 100;
const defaultDefence = 100;
const defaultVariance = 10;

const defaultMissChanceWeight = 100;
const defaultWeakChanceWeight = 200;
const defaultNormalChanceWeight = 400;
const defaultCriticalChanceWeight = 100;
const defaultMissMultiplier = 0;
const defaultWeakHitMultiplier = 50;
const defaultNormalHitMultiplier = 100;
const defaultCriticalHitMultiplier = 150;

const defaultChanceOfCrying = 0.4;
const defaultChanceOfDeathMessage = 1.0;
const defaultChanceOfWinMessage = 1.0;

const hitTypes = ["miss", "weak", "normal", "critical"] as const;
type HitType = ElementOf<typeof hitTypes>;

/**
 * Represents an enemy that can be fought.
 */
export class Enemy {

    public readonly name: string;

    public health: number;
    public readonly maxHealth: number;
    public hitCount = 0;

    public readonly strength: number;
    public readonly defence: number;
    public readonly variance: number;

    public readonly missChanceWeight: number;
    public readonly weakChanceWeight: number;
    public readonly normalChanceWeight: number;
    public readonly criticalChanceWeight: number;
    public readonly missMultiplier: number;
    public readonly weakHitMultiplier: number;
    public readonly normalHitMultiplier: number;
    public readonly criticalHitMultiplier: number;

    public readonly criesOfDespair: readonly string[];
    public readonly deathMessages: readonly string[];
    public readonly winMessages: readonly string[];
    public readonly chanceOfCrying: number;
    public readonly chanceOfDeathMessage: number;
    public readonly chanceOfWinMessage: number;

    public constructor({
        name,

        maxHealth,
        health = maxHealth,

        strength = defaultStrength,
        defence = defaultDefence,
        variance = defaultVariance,

        missChanceWeight = defaultMissChanceWeight,
        weakChanceWeight = defaultWeakChanceWeight,
        normalChanceWeight = defaultNormalChanceWeight,
        criticalChanceWeight = defaultCriticalChanceWeight,
        missMultiplier = defaultMissMultiplier,
        weakHitMultiplier = defaultWeakHitMultiplier,
        normalHitMultiplier = defaultNormalHitMultiplier,
        criticalHitMultiplier = defaultCriticalHitMultiplier,

        criesOfDespair,
        deathMessages,
        winMessages,
        chanceOfCrying = defaultChanceOfCrying,
        chanceOfDeathMessage = defaultChanceOfDeathMessage,
        chanceOfWinMessage = defaultChanceOfWinMessage,
    }: EnemyInitializer,
) {
        this.name = name;

        this.health = Math.floor(health);
        this.maxHealth = Math.floor(maxHealth);

        this.strength = strength;
        this.defence = defence;
        this.variance = variance;

        this.missChanceWeight = missChanceWeight;
        this.weakChanceWeight = weakChanceWeight;
        this.normalChanceWeight = normalChanceWeight;
        this.criticalChanceWeight = criticalChanceWeight;
        this.missMultiplier = missMultiplier;
        this.weakHitMultiplier = weakHitMultiplier;
        this.normalHitMultiplier = normalHitMultiplier;
        this.criticalHitMultiplier = criticalHitMultiplier;

        this.criesOfDespair = criesOfDespair;
        this.deathMessages = deathMessages;
        this.winMessages = winMessages;
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

    public getMultiplierForHitType(hitType: HitType) {
        return {
            miss: this.missMultiplier,
            weak: this.weakHitMultiplier,
            normal: this.normalHitMultiplier,
            critical: this.criticalHitMultiplier,
        }[hitType];
    }

    public getHitMessage(hitType: HitType, damage: number): (target: string) => string {
        return {
            miss: (target: string) => `**${this.name}** missed **${target}**.`,
            weak: (target: string) => `**${this.name}** grazed **${target}**. It did ${damage} hp damage.`,
            normal: (target: string) => `**${this.name}** hit **${target}**. It did ${damage} hp damage.`,
            critical: (target: string) => `**${this.name}** walloped **${target}**. It did ${damage} hp damage.`,
        }[hitType];
    }

    public getHitType(): HitType {
        return weightedRandomElement([
            [this.missChanceWeight, "miss"],
            [this.weakChanceWeight, "weak"],
            [this.normalChanceWeight, "normal"],
            [this.criticalChanceWeight, "critical"],
        ] as const);
    }

    public getDamage(defence: number): { damage: number, message: (target: string) => string } {
        const variance = this.strength * this.variance / 100;
        const baseDamage = randomIn(this.strength - variance, this.strength + variance);
        const hitType = this.getHitType();
        const multiplier = this.getMultiplierForHitType(hitType);
        const damage = Math.floor(baseDamage * multiplier / defence);
        const message = this.getHitMessage(hitType, damage);

        return { damage, message };
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
