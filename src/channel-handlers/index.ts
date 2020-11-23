import { Client, VoiceState } from "discord.js";
import { sequence } from "../utils/sequencer";
import { spaghettiosJingle } from "./jingles/spaghettios";

export async function handleChannelChange(client: Client, oldState: VoiceState, newState: VoiceState) {
    const user = client.user;
    if (!user) { return false; }
    if (oldState.member?.user.equals(user)) { return; }

    await sequence([
        spaghettiosJingle,
    ])(client, oldState, newState);
}
