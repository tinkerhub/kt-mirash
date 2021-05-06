exports.msgToChannel = async (client, errorHandleChannelID, user, username, err) => {
    await client.channels.cache.get(errorHandleChannelID).send(`${err.toString()} auth : ${user} userName : ${username}`);
};