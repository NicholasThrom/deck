import { Message } from "discord.js";
import { DefaultingMap } from "../../../../utils/defaulting-dictionary";
import { randomIn } from "../../../../utils/random";
import { Enemy } from "./enemy";
import { generateEnemy } from "./enemy-generator";

const enemies: DefaultingMap<string, Enemy> = new DefaultingMap((_) => generateEnemy());

export function attack(message: Message) {
    const { content, channel } = message;

    if (!content.match(/attack/i)) { return; }

    const enemy = enemies.get(channel.id);

    const damage = randomIn(10, 200);

    enemy.damage(damage);

    message.reply(enemy.healthNotification());
    if (enemy.isDead()) {
        message.channel.send(`${enemy.name} has been slain in ${enemy.hitCount} ${enemy.hitCount === 1 ? "hit" : "hits"}!`);
        if (enemy.shouldDeathMessage()) {
            message.channel.send(`${enemy.name}: "${enemy.deathMessage()}"`);
        }
        enemies.delete(channel.id);
    } else {
        if (enemy.shouldCry()) {
            message.channel.send(`${enemy.name}: "${enemy.cryOfDespair()}"`);
        }
    }

    return true;
}
