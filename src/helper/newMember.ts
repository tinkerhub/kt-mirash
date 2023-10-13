import type { Guild, Message } from "discord.js";
import {
	memberWithAlreadyIn,
	memberWrongIDMsg,
	personalMsg,
	verfiyMsg,
} from "../config/message";
import { serverResponse } from "./serverResponse";
import {
	campusCommunityRoleID,
	campusLeadRoleID,
	errorHandleChannelID,
	memberRoleID,
} from "../config";
import { msgToChannel } from "./msgToChannel";
import {db} from "./firebase";

export const newMembers = async (myGuild: Guild, message: Message, client) => {
	try {
		const id = message.content.trim();
		const user = message.author;
		const userID = user.id;
		const userName = user.username + "#" + user.discriminator;

		// accessing the databse through nocodb rest api

		const docRef = db.collection("users").where("id", "==", id);
		const doc = (await docRef.get()).docs[0];

		if(!doc || !doc.exists) {
			throw new Error(memberWrongIDMsg(userID));
		}

		if ("DiscordActive" in db && db.DiscordActive) {
			throw new Error(memberWithAlreadyIn(userID));
		}

		// else add role to user in discord
		const member = await myGuild.members.fetch(userID);
		await member.roles.add(memberRoleID);

		// // if the person is a student
		if (doc.get("description") === "Student") {
			await member.roles.add(campusCommunityRoleID);
			const firstName = doc.get("name").split(" ")[0];

			if ("member" in message) {
				message.member?.setNickname(firstName);
			}
		}
		// if campusLead
		if (doc.get("campusLead")) {
			await member.roles.add(campusLeadRoleID).catch(async (err) => {
				await msgToChannel(
					client,
					errorHandleChannelID,
					user,
					userName,
					err,
				);
			});
		}

		// changing the discord active to true in database
		// adding discord info to database
		await doc.ref.update({
			discordActive: true,
			discordUserId: userID,
			discordUserName: userName,
		});

		// showing user that verification successfull
		await serverResponse(message, verfiyMsg(userID));

		// sending verification message to user personally
		await user.send(personalMsg());
	} catch (e) {
		const id = message.author.id;
		if (e.response?.status === 404) {
			await serverResponse(message, memberWrongIDMsg(id));
		} else {
			await serverResponse(message, e.message);
		}
		console.log(e);
	}
};
