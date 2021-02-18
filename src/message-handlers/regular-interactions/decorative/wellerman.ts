import { Message, VoiceChannel } from "discord.js";
import { playAudioInChannel } from "../../../utils/play-audio";

export function wellerman(message: Message) {
    const { content } = message;

    if (!content.match(/wellerman/i)) { return; }
    const channels = message.guild?.channels.cache?.values();
    if (channels) {
        for (const channel of Array.from(channels)) {
            if (channel.type !== "voice") { continue; }
            const voiceChannel = (channel as VoiceChannel)
            const members = voiceChannel.members.values();
            for (const member of Array.from(members)) {
                if (member.id === message.author.id) {
                    playAudioInChannel(voiceChannel, "odd/wellerman.mp3");
                }
            }
        }
    }
    return true;
}
