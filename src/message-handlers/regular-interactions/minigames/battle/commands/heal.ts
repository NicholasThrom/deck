import dedent = require("dedent");
import { Message } from "discord.js";
import { enemies, users } from "../state";

export async function heal(message: Message) {
    if (!message.content.match(/heal/i)) { return; }

    const user = users.get(message.author.id);

    if (enemies.has(message.channel.id)) {
        await message.reply(dedent`
            You can't heal while you're fighting.
            Try \`run\`ning instead.
        `);
    } else {
        await message.reply("You've been healed.");
        user.revive();
    }

    return true;
}
