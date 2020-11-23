import { VoiceChannel, VoiceConnection } from "discord.js";
import * as path from "path";

export async function playAudio(connection: VoiceConnection, audio: string) {
    return connection.play(path.join(__dirname, "..", "..", "..", "audio", audio));
}

export async function playAudioInChannel(channel: VoiceChannel, audio: string) {
    const connection = await channel.join();
    const stream = await playAudio(connection, audio);
    stream.on("end", () => {
        connection.disconnect();
    });
}
