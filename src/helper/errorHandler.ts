export const errorMsg = async (message, userSendMsg: string) => {
	try {
		message.channel
			.send(userSendMsg)
			.then((msg) => setTimeout(() => msg.delete(), 10000));
	} catch (error) {
		console.log(error.toString());
	}
};
