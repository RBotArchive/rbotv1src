const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const sendSuggestionPanelMSG = require("./sendSuggestionPanelMSG");

module.exports = async function (client, interaction, suggestion) {
    const embed = new EmbedBuilder()
        .setTitle(`Suggestion de ${interaction.member.user.tag}`)
        .setColor(0x0099ff)
        .setDescription(suggestion)
        .setThumbnail(interaction.member.user.avatarURL({ dynamic: true }))
        .setTimestamp(Date.now())
        .setFooter({ text: "Créez un thread pour débattre des suggestions !" })
        .setAuthor({ name: "RBot", iconURL: client.user.avatarURL() });
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setLabel("Upvote")
            .setEmoji(":up:1066683099305484338")
            .setCustomId("upvote"),
        new ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setLabel("0")
            .setDisabled(true)
            .setCustomId("votenumbers"),
        new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setLabel("Downvote")
            .setEmoji(":down:1066683097304797184")
            .setCustomId("downvote")
    );
    channel = await client.channels.fetch("1038028005714448407");
    const msg = await channel.send({ embeds: [embed], components: [row] });
    await client.suggestionDB.set(`suggestion_${msg.id}`, {
        author: interaction.member.id,
        votes: {},
    });
    oldMessageID = await client.suggestionDB.get("suggestionPanelID");
    await channel.messages.cache.get(oldMessageID).delete();
    sendSuggestionPanelMSG(client, channel);
};
