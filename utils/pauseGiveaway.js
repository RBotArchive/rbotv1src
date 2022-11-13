module.exports = async function (client, interaction) {
    const query = interaction.options.getString("giveaway");

    // try to found the giveaway with prize then with ID
    const giveaway =
        // Search with giveaway prize
        client.giveawaysManager.giveaways.find(
            (g) => g.prize === query && g.guildId === interaction.guild.id
        ) ||
        // Search with giveaway ID
        client.giveawaysManager.giveaways.find(
            (g) => g.messageId === query && g.guildId === interaction.guild.id
        );

    // If no giveaway was found
    if (!giveaway) {
        return interaction.reply({
            content: "Impossible de trouver un giveaway avec `" + query + "`.",
            ephemeral: true,
        });
    }

    if (giveaway.pauseOptions.isPaused) {
        return interaction.reply({
            content: "Ce giveaway est déjà en pause.",
            ephemeral: true,
        });
    }

    // Edit the giveaway
    client.giveawaysManager
        .pause(giveaway.messageId)
        // Success message
        .then(() => {
            // Success message
            interaction.reply({
                content: "Giveaway mis en pause !",
                ephemeral: true,
            });
            replyembed = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle("Giveaway en pause")
                .setDescription(
                    `Giveaway ${interaction.options.getString(
                        "giveaway"
                    )} mis en pause par ${interaction.user.username}.`
                )
                .setAuthor({ name: "RBot", iconURL: client.user.avatarURL() });
            return client.channels.cache
                .get("1038028006339395602")
                .send({ embeds: [replyembed] });
        })
        .catch((e) => {
            interaction.reply({
                content: e,
                ephemeral: true,
            });
        });
};
