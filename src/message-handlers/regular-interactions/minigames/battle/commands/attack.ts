import { Message } from "discord.js";
import { randomIn } from "../../../../../utils/random";
import { enemies, users } from "../state";

export async function attack(message: Message) {
    if (!message.content.match(/attack/i)) { return; }

    const user = users.get(message.author.id);
    const enemy = enemies.get(message.channel.id);

    const damage = randomIn(10, 200);

    enemy.damage(damage);

    await message.channel.send(`**${user.nameInGuild(message.guild)}** hit **${enemy.name}**`);
    await message.channel.send(enemy.status());
    if (enemy.isDead()) {
        await message.channel.send(`**${enemy.name}** has been slain!`);
        if (enemy.shouldDeathMessage()) {
            await message.channel.send(enemy.deathMessage());
        }
        enemies.delete(message.channel.id);

        return true;
    } else {
        if (enemy.shouldCry()) {
            await message.channel.send(enemy.cryOfDespair());
        }
    }

    const { damage: userDamage, message: damageMessage } = enemy.getDamage(100);

    await message.channel.send(damageMessage(message.guild.member(user.id).displayName));
    user.damage(userDamage);
    await message.channel.send(user.status(message.guild));
    if (user.isDead()) {
        await message.channel.send(`**${message.guild.member(user.id).displayName}** has been slain!`);
        user.revive();
        enemies.delete(message.channel.id);
        if (enemy.shouldWinMessage()) {
            await message.channel.send(enemy.winMessage());
        }
    }

    return true;
}
