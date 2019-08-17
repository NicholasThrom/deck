import { Message } from "discord.js";
import { randomIn } from "../../../../../utils/random";
import { enemies, users } from "../state";

export function attack(message: Message) {
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
