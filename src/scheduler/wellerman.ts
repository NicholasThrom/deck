import { Client, VoiceChannel } from "discord.js";
import * as scheduler from "node-schedule";
import { playAudioInChannel } from "../utils/play-audio";

export function scheduleWellerman(client: Client) {
    scheduler.scheduleJob("26 * * * *", function () {
        const spaghettios = client.guilds.resolve("723736295968342028");
        if (!spaghettios) { return; }
        const screams = spaghettios.channels.resolve("723736295968342032");
        if (!screams || screams.type !== "voice") { return; }
        playAudioInChannel(screams as VoiceChannel, "odd/wellerman.mp3");
    })
}
