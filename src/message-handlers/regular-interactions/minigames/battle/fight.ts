import { Message } from "discord.js";
import { DefaultingMap } from "../../../../utils/defaulting-dictionary";
import { randomIn } from "../../../../utils/random";
import { sequence } from "../../../../utils/sequencer";
import { Enemy } from "./enemy";
import { generateEnemy } from "./enemy-generator";

const enemies: DefaultingMap<string, Enemy> = new DefaultingMap((_) => generateEnemy());

function attack(message: Message) {
    const { content, channel } = message;

    if (!content.match(/attack/i)) { return; }

    const enemy = enemies.get(channel.id);

    const damage = randomIn(10, 200);

    enemy.damage(damage);

    message.channel.send(enemy.status());
    if (enemy.isDead()) {
        message.channel.send(`**${enemy.name}** has been slain!`);
        if (enemy.shouldDeathMessage()) {
            message.channel.send(enemy.deathMessage());
        }
        enemies.delete(channel.id);
    } else {
        if (enemy.shouldCry()) {
            message.channel.send(enemy.cryOfDespair());
        }
    }

    return true;
}

function run(message: Message) {
    const { content, channel } = message;

    if (!content.match(/run/i)) { return; }

    const enemy = enemies.get(channel.id);

    message.reply("You ran away!");
    enemies.delete(channel.id);
    if (enemy.shouldWinMessage()) {
        message.channel.send(enemy.winMessage());
    }

    return true;
}

export const fight = sequence([
    attack,
    run,
]);
