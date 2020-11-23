import { Client, VoiceState } from "discord.js";
import { delay } from "../../utils/async";
import { playAudioInChannel } from "../../utils/play-audio";

export async function spaghettiosJingle(client: Client, oldState: VoiceState, newState: VoiceState) {
    if (newState.guild.name !== "cold spaghetti o's") {
        return false;
    }

    const channel = newState.channel;
    if (!channel) { return false; }
    if (oldState.channel) { return false; }

    await delay(1000);

    playAudioInChannel(channel, "jingle/cs.mp3");
    return true;
}
