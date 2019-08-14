import { Client, Message } from "discord.js";

function delay(time: number): Promise<undefined> {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

export async function handleMessage(client: Client, message: Message) {
    if (message.author.equals(client.user)) {
        return;
    }

    const { content } = message;

    if (/deck/.test(content.toLowerCase())) {
        await delay(5000);
        message.reply("dekt!");
    }
}
