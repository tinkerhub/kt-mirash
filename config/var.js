exports.memberWrongIDMsg = (userID) => {
    return `<@${userID}>, looks like you entered a wrong membership id. 😢 \n **TIP:** Please check for SMS / mail from TinkerHub and copy the 17 digit membership id.`;
};

exports.memberWithAlreadyIn = (userID) => {
    return `<@${userID}>, this code has already been used. 😞\n Please contact us at hello@tinkerhub.org for support.`;
};

exports.personalMsg = (userID) => {

    return `Howdy, awesome human! Congratulations on making it this far! 🎉 Welcome to the world of learning (& unlearning too). **Now you can access all the channels!** 💜 \n
    📚 Are you looking for resources to learn code? Head over to your favourite code channel: <#747859574199156777>, <#735203255671324863>, <#760758605627916318> etc.
    👫 If you're looking for a friend to learn with, check out <#735214780901752913>
    🏅 Bored? Try your hand at one of our challenges here: <#769099260330901504>
    🚀 Love opportunities? Jump to <#760177336909430814> for the latest and greatest stuff.
    🎮 Here to know what's cooking in tech? Read some <#747865817114345562>
    🎨 Check out the dope projects that our community is building: <#735206546920833185>
    
    ✨Quick tip: Consider heading to <#744827651679846421> and giving a quick introduction about yourself first.`;
};

exports.verfiyMsg = (userID) => {

    return `<@${userID}>,\n\n ✅ **Verification is successful!** Now you can access all the channels. 💜 \n\n ✨ Quick tip:** Consider heading to <#744827651679846421> and do a quick introduction about yourself.`;
};

exports.wrongId = (userID) => {

    return `Oops! Looks like something went wrong. 👎\n\n Please enter your 17 digit membership id to verify your identity.`;
};