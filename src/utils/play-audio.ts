import { VoiceChannel, VoiceConnection } from "discord.js";
import * as path from "path";

export async function playAudio(connection: VoiceConnection, audio: string) {
    return connection.play(path.join(__dirname, "..", "..", "..", "audio", audio));
}

export async function playAudioInChannel(channel: VoiceChannel, audio: string) {
    try {
        const connection = await channel.join();
        const stream = await playAudio(connection, audio);
        stream.on("finish", () => {
            connection.disconnect();
        });
    } catch (err) {
        console.log(`Tried to join channel ${channel.name} in ${channel.guild.name} but did not have permission.`);
    }
}
