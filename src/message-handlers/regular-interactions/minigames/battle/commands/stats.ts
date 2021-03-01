import { Message } from "discord.js";
import { users } from "../state";

export function stats(message: Message) {
    if (!message.content.match(/\.statu?s|^inv$|\.inventory/i)) { return; }

    const user = users.get(message.author.id);

    const guild = message.guild;
    if (!guild) { return false; }
    message.channel.send(user.status(guild));

    return true;
}
