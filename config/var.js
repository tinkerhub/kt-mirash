exports.memberWrongIDMsg = (userID) => {
    return `<@${userID}>, looks like you entered a wrong membership id. 😢 \n **TIP:** Please check for SMS / mail from TinkerHub and copy the 17 digit membership id.`;
};

exports.memberWithAlreadyIn = (userID) => {
    return `<@${userID}>, this code has already been used. 😞\n Please contact us at hello@tinkerhub.org for support.`;
};

/**
 *  @deprecated Use newMembers instead.
 */
exports.personalMsg = (userID) => {

    return `Howdy, awesome human! 
    ✅ **Verification is successful!** Now you can access all the channels. 💜 \n
    
    Congratulations on making it this far! 🎉 Welcome to the world of learning (& unlearning too). **Now you can access all the channels!** 💜 \n
    📚 Are you looking for resources to learn code? Head over to your favourite code channel: <#747859574199156777>, <#735203255671324863>, <#760758605627916318> etc.
    👫 If you're looking for a friend to learn with, check out <#735214780901752913>
    🏅 Bored? Try your hand at one of our challenges here: <#769099260330901504>
    🚀 Love opportunities? Jump to <#760177336909430814> for the latest and greatest stuff.
    🎮 Here to know what's cooking in tech? Read some <#747865817114345562>
    🎨 Check out the dope projects that our community is building: <#735206546920833185>
    
    ✨Quick tip: Consider heading to <#744827651679846421> and giving a quick introduction about yourself first.`;
};

exports.verfiyMsg = (userID) => {

    return `<@${userID}>,\n ✅ **Verification is successful!** Now you can access all the channels. 💜 \n\n ✨ Quick tip:** Consider heading to <#744827651679846421> and do a quick introduction about yourself.`;
};

exports.wrongId = (userID) => {

    return `Oops! Looks like something went wrong. 👎\n\n Please enter your 17 digit membership id to verify your identity.`;
};

exports.selectFromList = (list) => `Select from this list\n${list.join("\n")}`;

exports.codeStacks = [
    { name: "Frontend", emoji: "👨‍💻" },
    { name: "Hardware", emoji: "🖥️" },
    { name: "ML/Data Science", emoji: "📚" },
    { name: "Backend", emoji: "🔚" },
    { name: "Cybersecurity", emoji: "🛡️" }
];

exports.newMembers =
{
    welcomeMessage: "**WELCOME..!** \nHey, you have just landed on Tinkerhub Discord Server. Woohoo!! Let me introduce you to the world of learning (& unlearning too)",
    polarQuestions: [
        {
            question: "Before we get started, Do you want to know about TinkerHub?",
            yes: "Head over to https://tinkerhub.org",
            no: "Ok then let's move on."
        },
        {
            question: "Wanna play something before you head to our server?",
            yes: "Here you go https://www.improvememory.org/brain-games",
            no: "Seems like you cant wait to Tinker"
        },
        {
            question: "Curious to know what's happening here ?",
            yes: `\t**Monday- Learning Bytes** Getting started with the basics of simple tech topics to explore with a weekly assignment.
                **Tuesday-I^2 Talks** To know about the plethora of project options available to enhance your skill sets.
                **Wednesday-Campus Connect** Experience sharing of each campus community in a fun-filled manner
                **Thursday-Tech Sora** Intro to some of the advanced tech topics
                **Friday-Career Hacks** Insights to build an influential career.
                **Saturday- Mega Saturday** Healthy discussions around some everyday topics.
                **Sunday-Sunday Bash** Fun chilled session to break the ice with interesting games and stuff.`,
            no: "Ok fine, let's move on."
        }
    ],
    selectStack: `Now that you know all that has to be known, let me ask you a very important question.
        What stacks interests you the most? \n`
};