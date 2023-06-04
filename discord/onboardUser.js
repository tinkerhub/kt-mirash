// @ts-check
import { newMembers, codeStacks, selectFromList } from "../config/var";

/**
 * Helper function ask a yes or no question and return what user decided.
 * 
 * @param {string} question The question to be asked.
 * @param {Discord.TextChannel | Discord.DMChannel | Discord.NewsChannel} channel The channel were question has to be asked
 * @param {any} uid The user who is supposed to respond.
 *
 * @returns {Promise<boolean>} The response
 */
async function askPolar(question, channel, uid) 
{
    const filter = (reaction, user) => ["👍", "👎"].includes(reaction.emoji.name) && user.id === uid;

    // Send the message and wait for reactions.
    const message = await channel.send(question);
    const result = message.awaitReactions(filter, { max: 1 })
        .then(collected => collected.first()?.emoji.name === "👍")
        .catch(() => false)
        .finally(() => message.delete().catch(console.error));

    // Preset the reactions that the user can use.	
    await Promise.all([
        message.react("👍"),
        message.react("👎")
    ]);

    return result;

}

async function askMultiple(question, options, channel, uid)
{
    const filter = (reaction, user) => options.includes(reaction.emoji.name) && user.id === uid;

    const message = await channel.sendMessage(question);
    const collector = message.createReactionCollector(filter, { time: 15000 });

    const collected = [];
    collector.on('collect', (reaction) => collected.push(reaction.emoji.name));

    await Promise.all(options.map((emoji) => message.react(emoji)));
    await new Promise((resolve) => collector.on('end', () => resolve()));

    return collected;
}

/**
 * @param {Discord.TextChannel} channel
 * @param {number} uid 
 * @param {string} name
 */
export default async function (channel, uid, name)
{
    channel.send(newMembers.welcomeMessage);

    for (const polar of newMembers.polarQuestions)
        if (await askPolar(polar.question, channel, uid))
            channel.send(polar.yes);
        else
            channel.send(polar.no);

    channel.send(newMembers.selectStack);

    const emojiList = [], questionList = [];
    const emojiToChannelMap = {};

    codeStacks.forEach((stack) =>
    {
        questionList.push(`${stack.emoji} ${stack.name}`);
        emojiList.push(stack.emoji);
        emojiToChannelMap[stack.emoji] = stack.id;
    });

    const stackEmojis = await askMultiple(selectFromList(questionList), emojiList, channel, uid);



};