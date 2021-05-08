// * code for the rewiring
const dotenv = require('dotenv');
const Discord = require("discord.js");
const client = new Discord.Client();
var Airtable = require('airtable');
const config = require('config');
const { setUserRole } = require("./airtable/setUserRole");
const { newMembers } = require('./discord/newMemeber');

const { wrongId } = require("./config/var");
const { errorMsg } = require("./discord/erorMsg");

// ? config values
const guildID = config.get('guildID');
const airtableDB = config.get("airtableDB");
const straingGuildID = config.get("startingChannel");

dotenv.config();

client.login(process.env.DISCORD_TOKEN);

client.on("ready", () => {
    console.log("I am ready!");
});

client.on('message', async(message) => {


    if (message.content.toLowerCase().startsWith("r") &&
        message.channel.id === straingGuildID) {

        let myGuild = client.guilds.cache.get(guildID);
        let base = new Airtable({ apiKey: `${process.env.AIRTABLE_API_KEY}` }).base(airtableDB);

        await newMembers(myGuild, base, message, client);

    } else if (!message.author.bot && message.channel.id === `744627218743033887`) {
        await errorMsg(message, wrongId('user'));
    }

})