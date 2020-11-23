import { Client } from "discord.js";
import { fs } from "mz";
import { TypedJSON } from "typesafe-json";
import { handleMessage } from "./message-handlers";
import { setUpInputHandler } from "./message-sender/input-handler";

export async function setUp() {
    const client = new Client();

    client.on("ready", () => { console.log(`Logged in as ${client.user?.tag}!`); });
    client.on("message", async (message) => { await handleMessage(client, message); });
    await logIn(client);

    setUpInputHandler(client);
}

async function logIn(client: Client) {
    const tokenBuffer = (await fs.readFile("./secret.json"));
    const tokenJSON = TypedJSON.parse(tokenBuffer.toString());
    const token = tokenJSON.get("token").string();
    if (!token) { throw new Error("Token missing"); }
    await client.login(token);
}
