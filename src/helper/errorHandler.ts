export const errorMsg = async (message, userSendMsg) => {
	try {
		const msg = await message.channel.send(userSendMsg);
		msg.delete({ timeout: 10000 });
		message.delete({ timeout: 10000 });
	} catch (error) {
		console.log(error.toString());
	}
};
