const dotenv = require('dotenv');
const { Client, Intents } = require("discord.js");

const intents = new Intents([
    Intents.NON_PRIVILEGED,
    "GUILD_MEMBERS", 
]);

const client = new Client({ ws: { intents } });

dotenv.config();

client.login(process.env.DISCORD_TOKEN);

module.exports = client;