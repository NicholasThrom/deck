import { bar } from "../../../../../utils/strings/bar";
import { box } from "../../../../../utils/strings/box";

const defaultMaxHealth = 300;

/**
 * Represents a user's health and whatnot.
 */
export class User {

    public readonly id: string;
    public readonly maxHealth: number;
    public health: number;

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

    public status() {
        return box(`<@${this.id}>\n${this.healthBar()}`);
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
