import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { DISCORD_TOKEN, startingChannel, guildID } from "./config";
import { wrongId } from "./config/message";
import { errorMsg } from "./helper/errorHandler";

// load env file
dotenv.config();

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(DISCORD_TOKEN);

client.on("ready", () => {
	console.log(`Logged in`);
});

// user verification based on nocodb id
client.on("message", async (message) => {
	if (message.channel.id === startingChannel) {
		const myGuild = client.guilds.cache.get(guildID);

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
