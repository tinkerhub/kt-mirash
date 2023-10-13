import dotenv from "dotenv";

// verifying token is loaded correctly
// kinda like 2step verification🚶‍♂️
dotenv.config();

const guildID = process.env.guildID!;
const startingChannel = process.env.START_CHANNEL!;
const campusCommunityRoleID = process.env.campusCommunityRoleID!;
const memberRoleID = process.env.memberRoleID!;
const campusLeadRoleID = process.env.campusLeadRoleID!;
const femaleRoleID = process.env.femaleRoleID!;
const errorHandleChannelID = process.env.errorHandleChannelID!;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN!;
const NOCODB_API_BASEURL = process.env.NOCODB_API_BASEURL!;
const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN!;

export {
	guildID,
	startingChannel,
	campusCommunityRoleID,
	memberRoleID,
	campusLeadRoleID,
	femaleRoleID,
	errorHandleChannelID,
	DISCORD_TOKEN,
	NOCODB_API_BASEURL,
	NOCODB_API_TOKEN,
};
