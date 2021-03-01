import { Message } from "discord.js";
import { enemies, users } from "../state";

export function run(message: Message) {
    if (!message.content.match(/\.run/i)) { return; }

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
