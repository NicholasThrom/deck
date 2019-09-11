import { Message } from "discord.js";
import { randomIn } from "../../../../../utils/random";
import { enemies, users } from "../state";

export function attack(message: Message) {
    if (!message.content.match(/attack|kick/i)) { return; }

    const user = users.get(message.author.id);
    const enemy = enemies.get(message.channel.id);

    const { damage: enemyDamage, message: enemyHitMessage } = user.getDamage(enemy.defence);

    enemy.damage(enemyDamage);

    message.channel.send(enemyHitMessage(message.guild, enemy.name));
    message.channel.send(enemy.status());
    if (enemy.isDead()) {
        message.channel.send(`**${enemy.name}** has been slain!`);
        if (enemy.shouldDeathMessage()) {
            message.channel.send(enemy.deathMessage());
        }
        enemies.delete(message.channel.id);

        user.strength += Math.floor(randomIn(5, 15));
        user.defence += Math.floor(randomIn(5, 15));

        return true;
    } else {
        if (enemy.shouldCry()) {
            message.channel.send(enemy.cryOfDespair());
        }
    }

    const { damage: userDamage, message: damageMessage } = enemy.getDamage(user.defence);

    message.channel.send(damageMessage(message.guild.member(user.id).displayName));
    user.damage(userDamage);
    message.channel.send(user.status(message.guild));
    if (user.isDead()) {
        message.channel.send(`**${message.guild.member(user.id).displayName}** has been slain!`);
        user.revive();
        enemies.delete(message.channel.id);
        if (enemy.shouldWinMessage()) {
            message.channel.send(enemy.winMessage());
        }
    }

    return true;
}
