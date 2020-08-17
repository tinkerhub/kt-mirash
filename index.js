const Discord = require("discord.js");
const client = new Discord.Client();
var Airtable = require('airtable');
var base = new Airtable({apiKey: "keyRnMCAzv50kx8uJ"}).base('apppbhsk0pZUmRqYh');
client.login("NzM5Mzk4NDk3MjIwMDM0NjAx.XyZ4gw.OiJyn6o7Pvm9mw2z5ltGgLV_MqU");



client.on("ready", () => {
  console.log("I am ready!");
  myGuild = client.guilds.get("735180366297563257");
  // console.log(myGuild)
  // console.log(client.guilds['735180366297563257']);
});

// // When a member is added
// client.on('guildMemberAdd', member => {
//   // Send the first welcome message
//   member.send("Welcome to TinkerHub! You need your member id to get started. Please enter your member id. If you are not registered yet, please do it right away at tinkerhub.org/join. By proceeding you agree to the terms and conditions.");
// });

client.on('message', async message => {
  if (message.content.toLowerCase() === `accept` && message.channel.id === `744627218743033887`) {
  // What to do with accept
        message.author.send("Welcome to TinkerHub! You need your member id to get started. Please enter your member id. If you are not registered yet, please do it right away at tinkerhub.org/join. By proceeding you agree to the terms and conditions.");
  } else if (message.channel.type == `dm`) {
    id = message.content.trim();
    console.log(id);
    user = message.author;

    base('Members').find(id, async function(err, record) {
      if (err) {
        console.log(err);
        await user.send("Nice try!");
      } else {
        if (record.fields["Discord-Status"] ===  "Active") {
          user.send("This code is already used. Please contact us at hello@tinkerhub.org for support.");
        } else {
          try {
            base('Members').update(id, {
              "Discord-Status": "Active"
            }, function(err, record) {
              if (err) {
                console.error(err);
              } else {
                console.log(record.get('MobileNumber'));
                myGuild = client.guilds.get("735180366297563257");

                myGuild.fetchMember(message.author)
                  .then(async member => {
                    member.addRole('735193453780271135').catch(console.error);
                    await user.send('Thanks for verifying. Now you can access all the shit!');
                  });
              }
            });
          } catch (error) {
            console.log(error)
          }
        }
      }
    });

  } else {
    console.log("Moonchi");
  }
});



    
      
      // else {
      //    else {
      //   try {
          
              
              
              
              // Updating the permissions
              
              
    
  //           });
  //           });
         
  //       } 
  //     }}
  // });
    
  // } 



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

