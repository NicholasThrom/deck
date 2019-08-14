import { Client } from "discord.js";
import { fs } from "mz";
import { TypedJSON } from "typesafe-json";
import { handleMessage } from "./message-handler";

const client = new Client();

function onReady() {
    console.log(`Logged in as ${client.user.tag}!`);
}

function setUp() {
    client.on("ready", onReady);
    client.on("message", (message) => { handleMessage(client, message); });
    logIn();
}

async function logIn() {
    const tokenBuffer = (await fs.readFile("./secret.json"));
    const tokenJSON = TypedJSON.parse(tokenBuffer.toString());
    const token = tokenJSON.get("token").string();
    if (!token) { throw new Error("Token missing"); }
    client.login(token);
}

setUp();
