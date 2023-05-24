const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const sendSuggestionPanel = require("./sendSuggestionPanel");

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
            .setEmoji(client.config.upEmoji)
            .setCustomId("upvote"),
        new ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setLabel("0")
            .setDisabled(true)
            .setCustomId("votenumbers"),
        new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setLabel("Downvote")
            .setEmoji(client.config.downEmoji)
            .setCustomId("downvote")
    );
    channel = await client.channels.fetch(client.config.suggestionsChannel);
    const msg = await channel.send({ embeds: [embed], components: [row] });
    await client.suggestionDB.set(`suggestion_${msg.id}`, {
        author: interaction.member.id,
        votes: {},
    });
    oldMessageID = await client.suggestionDB.get("suggestionPanelID");
    await channel.messages.cache.get(oldMessageID).delete();
    sendSuggestionPanel(client, channel);
};
