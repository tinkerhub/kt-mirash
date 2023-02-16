export const errorMsg = async (message, userSendMsg: string) => {
	try {
		await message.channel.send(userSendMsg);
	} catch (error) {
		console.log(error.toString());
	}
};
