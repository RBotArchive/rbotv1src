const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");

module.exports = async function (client, interaction) {
    row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("makesuggestion")
            .setLabel("Créer une suggestion")
            .setStyle(ButtonStyle.Success)
    );
    replyembed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Suggestion")
        .setDescription(
            "Bienvenue dans le salon de suggestions. Vous pouvez voir les suggestions au dessus de ce message. Pour en créer une, cliquez sur le bouton ci-dessous."
        )
        .setAuthor({ name: "RBot", iconURL: client.user.avatarURL() });
    reply = await interaction.channel.send({
        embeds: [replyembed],
        components: [row],
    });
    client.suggestionDB.set("suggestionPanelID", reply.id);
};
