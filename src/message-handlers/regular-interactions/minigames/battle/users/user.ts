import dedent = require("dedent");
import { Guild } from "discord.js";
import { ElementOf } from "../../../../../utils/element-of";
import { randomIn, weightedRandomElement } from "../../../../../utils/random";
import { bar } from "../../../../../utils/strings/bar";
import { box } from "../../../../../utils/strings/box";

const defaultMaxHealth = 300;

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

const hitTypes = ["miss", "weak", "normal", "critical"] as const;
type HitType = ElementOf<typeof hitTypes>;

/**
 * Represents a user's health and whatnot.
 */
export class User {

    public readonly id: string;
    public readonly maxHealth: number;
    public health: number;

    public strength = defaultStrength;
    public defence = defaultDefence;
    public readonly variance = defaultVariance;

    public readonly missChanceWeight = defaultMissChanceWeight;
    public readonly weakChanceWeight = defaultWeakChanceWeight;
    public readonly normalChanceWeight = defaultNormalChanceWeight;
    public readonly criticalChanceWeight = defaultCriticalChanceWeight;
    public readonly missMultiplier = defaultMissMultiplier;
    public readonly weakHitMultiplier = defaultWeakHitMultiplier;
    public readonly normalHitMultiplier = defaultNormalHitMultiplier;
    public readonly criticalHitMultiplier = defaultCriticalHitMultiplier;

    public constructor({
        id,
        maxHealth = defaultMaxHealth,
        health = maxHealth,
    }: {
        id: string,
        maxHealth?: number,
        health?: number,
    }) {
        this.id = id;
        this.maxHealth = maxHealth;
        this.health = health;
    }

    public getMultiplierForHitType(hitType: HitType) {
        return {
            miss: this.missMultiplier,
            weak: this.weakHitMultiplier,
            normal: this.normalHitMultiplier,
            critical: this.criticalHitMultiplier,
        }[hitType];
    }

    public getHitMessage(hitType: HitType, damage: number): (guild: Guild, target: string) => string {
        return {
            miss: (guild: Guild, target: string) =>
                `**${this.nameInGuild(guild)}** missed **${target}**.`,
            weak: (guild: Guild, target: string) =>
                `**${this.nameInGuild(guild)}** grazed **${target}**. It did ${damage} hp damage.`,
            normal: (guild: Guild, target: string) =>
                `**${this.nameInGuild(guild)}** hit **${target}**. It did ${damage} hp damage.`,
            critical: (guild: Guild, target: string) =>
                `**${this.nameInGuild(guild)}** walloped **${target}**. It did ${damage} hp damage.`,
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

    public getDamage(defence: number): { damage: number, message: (guild: Guild, target: string) => string } {
        const variance = this.strength * this.variance / 100;
        const baseDamage = randomIn(this.strength - variance, this.strength + variance);
        const hitType = this.getHitType();
        const multiplier = this.getMultiplierForHitType(hitType);
        const damage = Math.floor(baseDamage * multiplier / defence);
        const message = this.getHitMessage(hitType, damage);

        return { damage, message };
    }

    public status(guild: Guild) {
        return box(dedent`
            **${this.nameInGuild(guild)}**
            ${this.healthBar()}
            _Attack_: ${this.strength} | _Defence_: ${this.defence}
        `);
    }

    public nameInGuild(guild: Guild) {
        return guild.member(this.id).displayName;
    }

    public healthBar() {
        return `${bar(this.health, this.maxHealth)} ${this.health}/${this.maxHealth} hp`;
    }

    public revive() {
        this.health = this.maxHealth;
    }

    public isDead() {
        return this.health <= 0;
    }

    public damage(amount: number) {
        this.health = Math.max(Math.floor(this.health - amount), 0);
    }
}
