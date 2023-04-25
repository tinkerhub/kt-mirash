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
import { nocodbApiHanlder } from "../config/apiHandler";

export const newMembers = async (myGuild: Guild, message: Message, client) => {
	try {
		const id = message.content.trim();
		const user = message.author;
		const userID = user.id;
		const userName = user.username + "#" + user.discriminator;

		// accessing the databse through nocodb rest api

		const { data: db } = await nocodbApiHanlder.get(
			`/db/data/v1/Platform/User/${id}`,
		);

		if (!("DiscordActive" in db)) {
			throw new Error("Invalid database schema");
		}

		if ("DiscordActive" in db && db.DiscordActive) {
			throw new Error(memberWithAlreadyIn(userID));
		}

		// else add role to user in discord
		const member = await myGuild.members.fetch(userID);
		await member.roles.add(memberRoleID);

		// // if the person is a student
		if (db.Description === "Student") {
			await member.roles.add(campusCommunityRoleID);
			const firstName = db.Name.split(" ")[0];
			if ("member" in message) {
				message.member?.setNickname(firstName);
			}
		}
		// if campusLead
		if (db.CampusLead) {
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
		await nocodbApiHanlder.patch(`/db/data/v1/Platform/User/${id}`, {
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
