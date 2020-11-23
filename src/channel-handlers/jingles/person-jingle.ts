import { Client, VoiceState } from "discord.js";
import { delay } from "../../utils/async";
import { playAudioInChannel } from "../../utils/play-audio";

export function personJingle(id: string, name: string) {
    return async (client: Client, oldState: VoiceState, newState: VoiceState) => {
        if (newState.member?.id !== id) { return false; }

        const channel = newState.channel;
        if (!channel) { return false; }
        if (oldState.channel) { return false; }

        await delay(1000);

        playAudioInChannel(channel, `jingle/${name}.mp3`);
        return true;
    };
}
