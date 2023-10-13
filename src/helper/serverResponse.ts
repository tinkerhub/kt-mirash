export const serverResponse = async (message, userSendMsg: string) => {
	try {
		message.channel.send(userSendMsg).then((msg) => {
			setTimeout(() => msg.delete(), 10000);
		});
	} catch {
		console.log("Error sending response");
	}
};
