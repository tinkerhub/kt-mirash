const config = require('config');
const campusCommunityRoleID = config.get('campusCommunityRoleID');
const memberRoleID = config.get('memberRoleID');
const campusLeadRoleID = config.get('campusLeadRoleID');
const femaleRoleID = config.get('femaleRoleID');
const errorHandleChannelID = config.get('errorHandleChannelID');

const { errorMsg } = require("../discord/erorMsg");
const { memberWrongIDMsg, memberWithAlreadyIn, personalMsg, verfiyMsg } = require("../config/var");
const { msgToChannel } = require('./msgToChannel');


exports.newMembers = async(myGuild, base, message, client) => {

    try {
        const id = message.content.trim();
        const user = message.author;
        const userID = user.id;
        const username = user.username + "#" + user.discriminator;

        // ? for finding user id
        base('Members').find(id, async function(err, record) {

            if (err) {
                console.log(err);
                await errorMsg(message, memberWrongIDMsg(userID));
                return null;
            }

            if (record.fields["Discord-Status"] === "Active") {
                await errorMsg(message, memberWithAlreadyIn(userID));
                return null;
            }

            let userid = user.id;
            let firstname = record.get('FullName');
            let member = await myGuild.members.fetch(userid).catch(async(err) => {
                await msgToChannel(client, errorHandleChannelID, user, username, err);
                throw err;
            });

            // * for user update
            base('Members').update(id, {
                "Discord-Status": "Active",
                "UserName": username,
                "UserId": userid
            }, async function(err, record) {

                if (err) {
                    console.error(`update base ${err}`);
                    return;
                }

                // ? setting nickname
                await myGuild.members.cache.get(userid).setNickname(`${firstname} 🎓`).catch(async(err) => {
                    await msgToChannel(client, errorHandleChannelID, user, username, err);
                    throw err;
                });

                // ? adding Member Role
                await member.roles.add(memberRoleID).catch(async(err) => {
                    await msgToChannel(client, errorHandleChannelID, user, username, err);
                    throw err;
                });

                // ? on verify SucessFull Msg
                await errorMsg(message, verfiyMsg(userID)).catch(async(err) => {
                    await msgToChannel(client, errorHandleChannelID, user, username, err);
                    throw err;
                });


                // ? sending personal Msg
                await user.send(personalMsg(userID)).catch(async(err) => {
                    await msgToChannel(client, errorHandleChannelID, user, username, err);
                    throw err;
                });;


                // ? if in campus Community add campus and campus community Role
                if (record.fields.CampusCommunityActive === "Yes") {

                    if (record.fields.CollegeRole) {
                        await member.roles.add(record.fields.CollegeRole).catch(async(err) => {
                            await msgToChannel(client, errorHandleChannelID, user, username, err);
                            throw err;
                        });
                    }

                    await member.roles.add(campusCommunityRoleID).catch(async(err) => {
                        await msgToChannel(client, errorHandleChannelID, user, username, err);
                        throw err;
                    });

                }

                // ? giving campus Lead Role
                if (record.fields["CampusLead"] === true) {
                    await member.roles.add(campusLeadRoleID).catch(async(err) => {
                        await msgToChannel(client, errorHandleChannelID, user, username, err);
                        throw err;
                    });
                }

                //  ? adding womens role
                if (record.fields['Pronoun'] === "She/Her") {
                    await member.roles.add(femaleRoleID).catch(async(err) => {
                        await msgToChannel(client, errorHandleChannelID, user, username, err);
                        throw err;
                    });
                }

            })

        })
    } catch (error) {

        console.log(`newMembers.js : newMembers() : ${error.toString()}`);
    }

};