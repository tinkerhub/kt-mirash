exports.errorMsg = async (message, userSendMsg) => {
   const msg = await message.channel.send(userSendMsg);
   msg.delete({ timeout: 4000 });
   message.delete({ timeout: 5000 });
};