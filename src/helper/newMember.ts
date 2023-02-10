import type { Guild, Message } from "discord.js";
import {
	memberWithAlreadyIn,
	memberWrongIDMsg,
	personalMsg,
	verfiyMsg,
} from "src/config/message";
import { errorMsg } from "./errorHandler";
import {
	memberRoleID,
	campusLeadRoleID,
	campusCommunityRoleID,
	errorHandleChannelID,
} from "../config";
import { msgToChannel } from "./msgToChannel";

export const newMembers = async (myGuild: Guild, message: Message, client) => {
	try {
		const id = message.content.trim();
		const user = message.author;
		const userID = user.id;
		const username = user.username + "#" + user.discriminator;

		// ? for finding user id
		base("Members").find(id, async function (err, record) {
			if (err) {
				console.log(err);
				await errorMsg(message, memberWrongIDMsg(userID));
				return null;
			}

			if (record.fields["Discord-Status"] === "Active") {
				await errorMsg(message, memberWithAlreadyIn(userID));
				await client.channels.cache
					.get(errorHandleChannelID)
					.send(
						`♻️ User already active. auth : ${user} userName : ${username}`,
					);
				return null;
			}

			let firstname = record.get("FullName");
			const member = await myGuild.members.fetch(userID);

			// * for user update
			base("Members").update(
				id,
				{
					"Discord-Status": "Active",
					UserName: username,
					UserId: userID,
				},
				async function (err, record) {
					if (err) {
						console.error(`update base ${err}`);
						return;
					}
					await member.roles.add(memberRoleID);
					await errorMsg(message, verfiyMsg(userID));
					await user.send(personalMsg());
					await myGuild.members.cache
						.get(userID)
						.setNickname(`${firstname}`);

					// ? if in campus Community add campus and campus community Role
					if (record.fields.CampusCommunityActive === "Yes") {
						if (record.fields.CampusCommunityActive === "Yes") {
							// await member.roles.add(record.fields.CollegeRole);
							await member.roles.add(campusCommunityRoleID);
							await myGuild.members.cache
								.get(userID)
								.setNickname(`${firstname}`);

							// ? giving campus Lead Role
							if (record.fields["CampusLead"] === true) {
								await member.roles
									.add(campusLeadRoleID)
									.catch(async (err) => {
										await msgToChannel(
											client,
											errorHandleChannelID,
											user,
											username,
											err,
										);
										throw err;
									});
							}
						}
					}
				},
			);
		});
	} catch (error) {
		await client.channels.cache
			.get(errorHandleChannelID)
			.send(`${error.toString()} auth : ${user} userName : ${username}`);
	}
};
