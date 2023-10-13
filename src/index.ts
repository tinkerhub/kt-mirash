import dotenv from "dotenv";
import { Client, GatewayIntentBits, Partials } from "discord.js";
import { DISCORD_TOKEN, startingChannel, guildID } from "./config";
import { wrongId } from "./config/message";
import { serverResponse } from "./helper/serverResponse";
import { newMembers } from "./helper/newMember";
import {db} from "./helper/firebase";

// load env file
dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
	partials: [Partials.Channel],
});
client.login(DISCORD_TOKEN).then();

client.on("ready", () => {
	console.log(`Logged in as ${client.user?.tag}`);
});

// user verification based on nocodb id
client.on("messageCreate", async (message) => {
	if (message.channel.id === startingChannel && !message.author.bot) {
		// clearing user input
		message.channel.messages
			.fetch({ limit: 1 })
			.then((messages) => {
				const botMsg = messages.last();
				setTimeout(() => {
					botMsg.delete();
				}, 10000);
			})
			.catch(console.error);
		const guild = client.guilds.cache.get(guildID);
		if (!guild) throw new Error("Could not find guild check your env");
		await newMembers(guild, message, client);
	} else if (
		!message.author.bot &&
		message.channel.id === `744627218743033887` &&
		message.author.id !== "735045662672027718"
	) {
		await serverResponse(message, wrongId());
	}
});

// when user leaves the server this event is triggered
// (for future usecase)
client.on("guildMemberRemove", async (member) => {
	try {
		const docRef = db.collection("users").where("discordUserId", "==", member.id);
		const doc = (await docRef.get()).docs[0];

		await doc.ref.update({
			discordActive: false,
		});
	} catch {
		console.log("NO USER FOUND IN DB WHEN LEAVING THE SERVER");
	}
	// You can also perform other actions here, such as sending a farewell message or updating a database
});
