const config = require('config');
const campusCommunityRoleID = config.get('campusCommunityRoleID');
const memberRoleID = config.get('memberRoleID');
const campusLeadRoleID = config.get('campusLeadRoleID');
const femaleRoleID = config.get('femaleRoleID');
const errorHandleChannelID = config.get('errorHandleChannelID');

const { errorMsg } = require("../discord/erorMsg");
const { memberWrongIDMsg, memberWithAlreadyIn, personalMsg, verfiyMsg } = require("../config/var");


exports.newMembers = async (myGuild, base, message, client) => {

    const id = message.content.trim();
    const user = message.author;
    const userID = user.id;
    const username = user.username + "#" + user.discriminator;

    try {
        // ? for finding user id
        base('Members').find(id, async function (err, record) {

            if (err) {
                await errorMsg(message, memberWrongIDMsg(userID));
                return null;
            }

            if (record.fields["Discord-Status"] === "Active") {
                await errorMsg(message, memberWithAlreadyIn(userID));
                return null;
            }

            let userid = record.get('UserId');
            let firstname = record.get('FullName');
            let member = await myGuild.members.fetch(userid);

            // * for user update
            base('Members').update(id, {
                "Discord-Status": "Active",
                "UserName": username,
                "UserId": userid
            }, async function (err, record) {

                if (err) {
                    console.error(`update base ${err}`);
                    return;
                }

                let peru = myGuild.members.cache.get(userid);
                peru = peru.user.username;

                await myGuild.members.cache.get(userid).setNickname(`${firstname} 🎓`)

                await member.roles.add(memberRoleID)

                await user.send(personalMsg(userID))

                await errorMsg(message, verfiyMsg(userID))

            });


            if (record.fields.CampusCommunityActive === "Yes") {

                await member.roles.add(record.fields.CollegeRole);

                await member.roles.add(campusCommunityRoleID);

            }

            if (record.fields["CampusLead"] === true) {
                await member.roles.add(campusLeadRoleID);
            }

            if (record.fields['Pronoun'] === "She/Her") {
                await member.roles.add(femaleRoleID);
            }

        });
    } catch (error) {

        await client.channels.cache.get(errorHandleChannelID).send(`${error.toString()} auth : ${user} userName : ${username}`  );

    }

};