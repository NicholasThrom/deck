import { Client, VoiceState } from "discord.js";
import { playAudioInChannel } from "../../utils/play-audio";

export async function spaghettiosJingle(client: Client, oldState: VoiceState, newState: VoiceState) {
    if (newState.guild.name !== "cold spaghetti o's") {
        return false;
    }

    const channel = newState.channel;
    if (!channel) { return false; }
    if (!oldState.channel || channel.equals(oldState.channel)) { return false; }
    playAudioInChannel(channel, "jingle/cs.mp3");
    return true;
}
