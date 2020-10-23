const dotenv = require('dotenv');
const Discord = require("discord.js");
const client = new Discord.Client();
var Airtable = require('airtable');

dotenv.config()

var base = new Airtable({apiKey: `${process.env.AIRTABLE_API_KEY}`}).base('apppbhsk0pZUmRqYh');

client.login(process.env.DISCORD_TOKEN);
client.on("ready", () => {
  console.log("I am ready!");
  myGuild = client.guilds.get("735180366297563257");
});

// // When a member is added
// client.on('guildMemberAdd', member => {
//   // Send the first welcome message
//   member.send("Welcome to TinkerHub! You need your member id to get started. Please enter your member id. If you are not registered yet, please do it right away at tinkerhub.org/join. By proceeding you agree to the terms and conditions.");
// });

client.on('message', async message => {
  if (message.content.toLowerCase().startsWith("r") && message.channel.id === `744627218743033887`) {
    id = message.content.trim();
    console.log(id);
    user = message.author;
    userid = user.id;
    username = user.username + "#" + user.discriminator;
    console.log(`This is user id ${username}`);

      base('Members').find(id, async function(err, record) {
      if (err) {
        // console.log(err);
        message.channel.send(`<@${userid}>, looks like you entered a wrong membership id. 😢 \n **TIP:** Please check for SMS / mail from TinkerHub and copy the 17 digit membership id.`)
        .then(async msg => {
          msg.delete(40000);
          message.delete(5000);
        });
        console.log("done");
      } else {
        if (record.fields["Discord-Status"] ===  "Active") {
          message.channel.send(`<@${userid}>, this code has already been used. 😞\n Please contact us at hello@tinkerhub.org for support.`)
          .then(async msg => {
            msg.delete(40000);
            message.delete(5000);
          });
        } else {
          try {
            base('Members').update(id, {
              "Discord-Status": "Active",  
              "UserName": username,
              "UserId" : userid
            }, function(err, record) {
              if (err) {
                console.error(err);
              } else {
                console.log(record.get('MobileNumber'));
                myGuild = client.guilds.get("735180366297563257");

                myGuild.fetchMember(message.author)
                  .then(async member => {
                    member.addRole('735193453780271135').catch(console.error);
                    await user.send(`Howdy, awesome human! Congratulations on making it this far! 🎉 Welcome to the world of learning (& unlearning too). **Now you can access all the channels!** 💜 \n
                    📚 Are you looking for resources to learn code? Head over to your favourite code channel: <#747859574199156777>, <#735203255671324863>, <#760758605627916318> etc.
                    👫 If you're looking for a friend to learn with, check out <#735214780901752913>
                    🏅 Bored? Try your hand at one of our challenges here: <#769099260330901504>
                    🚀 Love opportunities? Jump to <#760177336909430814> for the latest and greatest stuff.
                    🎮 Here to know what's cooking in tech? Read some <#747865817114345562>
                    🎨 Check out the dope projects that our community is building: <#735206546920833185>
                    
                    ✨Quick tip: Consider heading to <#744827651679846421> and giving a quick introduction about yourself first.
                    `);
                    message.channel.send(`<@${userid}>,\n\n ✅ **Verification is successful!** Now you can access all the channels. 💜 \n\n ✨ Quick tip:** Consider heading to <#744827651679846421> and do a quick introduction about yourself. `)
                    .then(async msg => {
                      msg.delete(40000);
                      message.delete(5000);
                    });
                  });
              }
            });
          } catch (error) {
            console.log(error)
          }
        }
      }
    });
  
} else if (!message.author.bot) {
    console.log("Moonchi");
    message.channel.send("Oops! Looks like something went wrong. 👎\n\n Please enter your 17 digit membership id to verify your identity.")
  .then(msg => {
  console.log(message.content);
  message.delete(10000);
  msg.delete(10000);
  });
  }
});




//  വന്ന വഴി മറക്കരുത്. ഇത് ഇവിടെ കിടന്നോട്ടെ. 
// function newFunction() {
//   let myGuild;
//   return myGuild;
// }
// client.on("message", (message) => {
//   if (message.content.startsWith("Accept")) {
//     let member = message.member;
//     member.addRole('735193453780271135').catch(console.error);
//     message.channel.send("Now you are a member, " + member + ". Welcome to TinkerHub!");

//     base('Members').update("recWdjpvx7Zxlclzq", {
//       "Discord-Status": "Active"
//     }, function(err, record) {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.log(record.get('MobileNumber'));
//     });
//     // message.channel.createInvite()
//     // .then(invite => message.channel.send(`Created an invite with a code of https://discord.gg/${invite.code}`))
//     // .catch(console.error);
//   }
//   if (message.content.startsWith("Add me")) {
//     let member = message.member;
//     message.channel.send("Added " + member + " to airtable");
//   }
  
// });





