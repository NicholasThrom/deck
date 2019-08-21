import { Message } from "discord.js";
import { users } from "../state";

export function stats(message: Message) {
    if (!message.content.match(/statu?s|^inv$|inventory/i)) { return; }

    const user = users.get(message.author.id);

    message.channel.send(user.status(message.guild));

    return true;
}
