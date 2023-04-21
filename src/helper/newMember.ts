import type { Guild, Message } from "discord.js";
import {
	memberWithAlreadyIn,
	memberWrongIDMsg,
	personalMsg,
	verfiyMsg,
} from "../config/message";
import { errorMsg } from "./errorHandler";
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
		const username = user.username + "#" + user.discriminator;

		// accessing the databse through nocodb rest api

		const { data: db } = await nocodbApiHanlder.get(
			`/db/data/v1/Platform/User/${id}`,
		);

		if (db.discordActive) {
			message.channel.messages
				.fetch({ limit: 2 })
				.then((messages) => {
					const botMsg = messages.last();
					setTimeout(() => {
						botMsg.delete();
					}, 10000);
				})
				.catch(console.error);
			return errorMsg(message, memberWithAlreadyIn(userID));
		}

		// else add role to user in discord
		const member = await myGuild.members.fetch(userID);
		await member.roles.add(memberRoleID);

		// // if the person is a student
		if (db.description === "Student") {
			await member.roles.add(campusCommunityRoleID);
			const fistName = db.name.split(" ")[0];
			message?.member ? message.member.setNickname(fistName) : null;
		}
		// if campusLead
		if (db.campusLead === true) {
			await member.roles.add(campusLeadRoleID).catch(async (err) => {
				await msgToChannel(
					client,
					errorHandleChannelID,
					user,
					username,
					err,
				);
			});
		}

		// changing the discord active to true in database
		await nocodbApiHanlder.patch(`/db/data/v1/Platform/User/${id}`, {
			discordActive: true,
		});

		// showing user that verification successfull
		await errorMsg(message, verfiyMsg(userID));
		// sending verification message to user personally
		await user.send(personalMsg());
		message.channel.messages
			.fetch({ limit: 2 })
			.then((messages) => {
				const botMsg = messages.last();
				setTimeout(() => {
					botMsg.delete();
				}, 10000);
			})
			.catch(console.error);
	} catch {
		const id = message.author.id;
		await errorMsg(message, memberWrongIDMsg(id));
		message.channel.messages
			.fetch({ limit: 1 })
			.then((messages) => {
				const botMsg = messages.last();
				setTimeout(() => {
					botMsg.delete();
				}, 10000);
			})
			.catch(console.error);
	}
};
