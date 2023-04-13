const { EmbedBuilder } = require("discord.js");
const handleLevelChange = require("../utils/handleLevelChange.js");

module.exports = {
    name: "messageCreate",
    async execute(client, message) {
        if (message.author.bot === true) return;
        if (client.talkedRecently.get(message.author.id)) {
            return;
        }
        currentXp =
            (await client.xpDB.get(`${message.author.id}_currentXp`)) | 0;
        newXp = currentXp + Math.floor(Math.random() * (5 - 1) + 1);
        currentLevel =
            (await client.xpDB.get(`${message.author.id}_currentLevel`)) | 0;
        if (newXp >= (currentLevel + 1) * 10) {
            newXp = newXp - (currentLevel + 1) * 10;
            newLevel = currentLevel + 1;
            await client.xpDB.set(
                `${message.author.id}_currentLevel`,
                newLevel
            );
            newlevelembed = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle(`${message.author.username} 🏅 ${newLevel}`)
                .setThumbnail(message.author.avatarURL())
                .setDescription(
                    `Bravo à toi ${message.author.username}, tu es passé au niveau ${newLevel} !` +
                        (await handleLevelChange(client, message, newLevel))
                )
                .setAuthor({ name: "RBot", iconURL: client.user.avatarURL() });
            client.channels.cache.get(client.config.newLevelChannel).send({
                content: `<@${message.author.id}>`,
                embeds: [newlevelembed],
            });
        }
        await client.xpDB.set(`${message.author.id}_currentXp`, newXp);
        client.talkedRecently.set(message.author.id, Date.now() + 10000);
        setTimeout(
            () =>
                client.talkedRecently.delete(
                    message.author.id,
                    Date.now() + 10000
                ),
            10000
        );
    },
};
