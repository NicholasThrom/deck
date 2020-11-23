import { Client, VoiceState } from "discord.js";
import { sequence } from "../utils/sequencer";
import { personJingle } from "./jingles/person-jingle";
import { spaghettiosJingle } from "./jingles/spaghettios";

export async function handleChannelChange(client: Client, oldState: VoiceState, newState: VoiceState) {
    const user = client.user;
    if (!user) { return false; }
    if (oldState.member?.user.equals(user)) { return; }

    await sequence([
        // Individual jingles
        personJingle("270690726759628802", "phantom"),
        personJingle("400455097433456640", "sarah"),
        personJingle("397471150378319872", "emma"),
        personJingle("206270542242643968", "riley"),
        personJingle("218737910508158977", "half"),
        personJingle("86647719875067904", "shiny"),

        // Server jingles
        spaghettiosJingle,
    ])(client, oldState, newState);
}
