import { Client, Guild, TextChannel } from "discord.js";
import { readline } from "mz";

const stdin = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export async function setUpInputHandler(client: Client) {
    await listGuilds(client);
}

async function listGuilds(client: Client) {
    const guilds = Array.from(client.guilds.values());
    console.log();
    console.log("`restart` at any time to restart");
    console.log();
    console.log("Servers available:");
    console.log(guilds.map((guild, index) => `${index + 1}: ${guild.name}`).join("\n"));

    joinGuild(client, guilds);
}

async function joinGuild(client: Client, guilds: Guild[]) {
    const answer = await stdin.question("\n`join [number]` to join the server\n");

    const restartMatch = answer.match(/^restart/);

    if (restartMatch) {
        await listGuilds(client);
        return;
    }

    const match = answer.match(/^join (\d+)/);

    if (!match) {
        console.log("Invalid command");
        await joinGuild(client, guilds);
        return;
    }

    const guildNumber = parseInt(match[1], 10) - 1;

    if (isNaN(guildNumber) || guildNumber < 0 || guildNumber >= guilds.length) {
        console.log("Invalid selection");
        await joinGuild(client, guilds);
        return;
    }

    const guild = guilds[guildNumber];
    console.log(`Joined ${guild.name}`);

    await listChannels(client, guild);
}

async function listChannels(client: Client, guild: Guild) {
    const channels = Array.from(
        guild.channels.values())
            .filter((channel): channel is TextChannel => channel.type === "text",
    );
    console.log();
    console.log("Channels available:");
    console.log(channels.map((channel, index) => `${index + 1}: ${channel.name}`).join("\n"));

    joinChannel(client, channels);
}

async function joinChannel(client: Client, channels: TextChannel[]) {
    const answer = await stdin.question("\n`join [number]` to join the channel\n");

    const restartMatch = answer.match(/^restart/);

    if (restartMatch) {
        await listGuilds(client);
        return;
    }

    const match = answer.match(/^join (\d+)/);

    if (!match) {
        console.log("Invalid command");
        await joinChannel(client, channels);
        return;
    }

    const channelNumber = parseInt(match[1], 10) - 1;

    if (isNaN(channelNumber) || channelNumber < 0 || channelNumber >= channels.length) {
        console.log("Invalid selection");
        await joinChannel(client, channels);
        return;
    }

    const channel = channels[channelNumber];
    console.log(`Joined ${channel.name}`);

    await speak(client, channel);
}

async function speak(client: Client, channel: TextChannel) {
    const answer = await stdin.question("\n`say [message]` to say something\n");

    const restartMatch = answer.match(/^restart/);

    if (restartMatch) {
        await listGuilds(client);
        return;
    }

    const match = answer.match(/^say (.*)/);

    if (!match) {
        console.log("Invalid command");
        await speak(client, channel);
        return;
    }

    const message = match[1];

    channel.send(message);
    await speak(client, channel);
}
