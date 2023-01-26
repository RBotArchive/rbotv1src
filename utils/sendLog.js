const { EmbedBuilder } = require("discord.js");

module.exports = async function (client, title, desc) {
    replyembed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(title)
        .setDescription(desc)
        .setTimestamp(Date.now())
        .setAuthor({ name: "RBot", iconURL: client.user.avatarURL() });
    return client.channels.cache
        .get("1038028006339395602")
        .send({ embeds: [replyembed] });
};
