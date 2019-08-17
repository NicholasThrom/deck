import { Message } from "discord.js";
import { DefaultingMap } from "../../../../utils/defaulting-dictionary";
import { randomIn } from "../../../../utils/random";
import { sequence } from "../../../../utils/sequencer";
import { Enemy } from "./enemy";
import { generateEnemy } from "./enemy-generator";
import { User } from "./user";

const enemies: DefaultingMap<string, Enemy> = new DefaultingMap((_) => generateEnemy());
const users: DefaultingMap<string, User> = new DefaultingMap((id) => new User({ id }));

function attack(message: Message) {
    if (!message.content.match(/attack/i)) { return; }

    const user = users.get(message.author.id);
    const enemy = enemies.get(message.channel.id);

    const damage = randomIn(10, 200);

    enemy.damage(damage);

    message.channel.send(`<@${user.id}> hit **${enemy.name}**`);
    message.channel.send(enemy.status());
    if (enemy.isDead()) {
        message.channel.send(`**${enemy.name}** has been slain!`);
        if (enemy.shouldDeathMessage()) {
            message.channel.send(enemy.deathMessage());
        }
        enemies.delete(message.channel.id);

        return true;
    } else {
        if (enemy.shouldCry()) {
            message.channel.send(enemy.cryOfDespair());
        }
    }

    const userDamage = randomIn(10, 80);

    user.damage(userDamage);

    message.channel.send(`**${enemy.name}** hit <@${user.id}>`);
    message.channel.send(user.status());
    if (user.isDead()) {
        message.channel.send(`<@${user.id}> has been slain!`);
        user.revive();
        enemies.delete(message.channel.id);
        if (enemy.shouldWinMessage()) {
            message.channel.send(enemy.winMessage());
        }
    }

    return true;
}

function run(message: Message) {
    if (!message.content.match(/run/i)) { return; }

    const user = users.get(message.author.id);
    const enemy = enemies.get(message.channel.id);

    message.reply("You ran away!");
    enemies.delete(message.channel.id);
    if (enemy.shouldWinMessage()) {
        message.channel.send(enemy.winMessage());
    }
    user.revive();

    return true;
}

function stats(message: Message) {
    if (!message.content.match(/statu?s|^inv$|inventory/i)) { return; }

    const user = users.get(message.author.id);

    message.channel.send(user.status());

    return true;
}

export const fight = sequence([
    attack,
    run,
    stats,
]);
