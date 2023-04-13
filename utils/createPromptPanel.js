const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");

module.exports = async function (client, interaction, name, desc, button, buttonid, isSuggestion = false) {
    channel = interaction.channel || interaction
    row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(buttonid)
            .setLabel(button)
            .setStyle(ButtonStyle.Success)
    );
    replyembed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(name)
        .setDescription(
            desc
        )
        .setAuthor({ name: "RBot", iconURL: client.user.avatarURL() });
    reply = await channel.send({
        embeds: [replyembed],
        components: [row],
    });
    if (isSuggestion === true) {
        client.suggestionDB.set("suggestionPanelID", reply.id);
    }
};
