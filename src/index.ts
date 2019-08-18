import { Client } from "discord.js";
import { fs } from "mz";
import { TypedJSON } from "typesafe-json";
import { handleMessage } from "./message-handlers";

const client = new Client();

function onReady() {
    console.log(`Logged in as ${client.user.tag}!`);
}

export async function setUp() {
    client.on("ready", onReady);
    client.on("message", async (message) => { await handleMessage(client, message); });
    await logIn();
}

async function logIn() {
    const tokenBuffer = (await fs.readFile("./secret.json"));
    const tokenJSON = TypedJSON.parse(tokenBuffer.toString());
    const token = tokenJSON.get("token").string();
    if (!token) { throw new Error("Token missing"); }
    await client.login(token);
}
