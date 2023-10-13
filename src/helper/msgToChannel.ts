export const msgToChannel = async (
	client,
	errorHandleChannelID: string,
	user,
	username,
	err,
) => {
	await client.channels.cache
		.get(errorHandleChannelID)
		.send(`${err.toString()} auth : ${user} userName : ${username}`);
};
