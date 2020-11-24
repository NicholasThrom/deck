import { VoiceChannel, VoiceConnection } from "discord.js";
import * as path from "path";

export async function joinChannel(channel: VoiceChannel) {
    try {
        return await channel.join();
    } catch (err) {
        console.log(`Tried to join channel ${channel.name} in ${channel.guild.name} but did not have permission.`);
    }
}

export async function playAudio(connection: VoiceConnection, audio: string) {
    return connection.play(path.join(__dirname, "..", "..", "..", "audio", audio));
}

export async function playAudioInChannel(channel: VoiceChannel, audio: string) {
    const connection = await joinChannel(channel);
    if (!connection) { return; }
    const stream = await playAudio(connection, audio);
    stream.on("finish", () => {
        connection.disconnect();
    });
}
