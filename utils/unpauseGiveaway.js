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

    if (!giveaway.pauseOptions.isPaused) {
        return interaction.reply({
            content: "This giveaway is not paused.",
            ephemeral: true,
        });
    }

    // Edit the giveaway
    client.giveawaysManager
        .unpause(giveaway.messageId)
        // Success message
        .then(() => {
            // Success message
            interaction.reply("Giveaway unpaused!");
        })
        .catch((e) => {
            interaction.reply({
                content: e,
                ephemeral: true,
            });
        });
};
