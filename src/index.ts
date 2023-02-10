import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { DISCORD_TOKEN, startingChannel, guildID } from "./config";
import { wrongId } from "./config/message";
import { errorMsg } from "./helper/errorHandler";

// load env file
dotenv.config();

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
client.login(DISCORD_TOKEN);

client.on("ready", () => {
	console.log(`Logged in as ${client.user?.tag}`);
});

// user verification based on nocodb id
client.on("messageCreate", async (message) => {
	console.log(startingChannel, "start channel is");
	console.log(message.channel.id);
	if (message.channel.id === startingChannel && !message.author.bot) {
		const guild = client.guilds.cache.get(guildID);
		// TODO
		// send userID to nocodb api
		// verify if user exist ?
		// if user exist assign role
		// DONE
	} else if (
		!message.author.bot &&
		message.channel.id === `744627218743033887` &&
		message.author.id !== "735045662672027718"
	) {
		await errorMsg(message, wrongId());
	}
});
