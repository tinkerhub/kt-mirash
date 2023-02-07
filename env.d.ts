declare namespace NodeJS {
	export interface ProcessEnv {
		guildID: string;
		startingChannel: string;
		campusCommunityRoleID: string;
		memberRoleID: string;
		campusLeadRoleID: string;
		femaleRoleID: string;
		errorHandleChannelID: string;
		DISCORD_TOKEN: string;
	}
}
