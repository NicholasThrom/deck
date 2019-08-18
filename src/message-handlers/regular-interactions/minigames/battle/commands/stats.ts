import { Message } from "discord.js";
import { users } from "../state";

export async function stats(message: Message) {
    if (!message.content.match(/statu?s|^inv$|inventory/i)) { return; }

    const user = users.get(message.author.id);

    await message.channel.send(user.status());

    return true;
}
