const sendLog = require("../utils/sendLog.js");

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
            content:
                ":x: Impossible de trouver un giveaway avec `" + query + "`.",
            ephemeral: true,
        });
    }

    if (!giveaway.ended) {
        return interaction.reply({
            content: ":x: Ce giveaway n'est pas encore terminé.",
            ephemeral: true,
        });
    }

    // Reroll the giveaway
    client.giveawaysManager
        .reroll(giveaway.messageId)
        .then(() => {
            // Success message
            interaction.reply("Giveaway reroll !");
            sendLog(
                client,
                "Giveaway reroll",
                `Giveaway ${interaction.options.getString(
                    "giveaway"
                )} reroll par ${interaction.user.username}.`
            );
            return;
        })
        .catch((e) => {
            interaction.reply({
                content: e,
                ephemeral: true,
            });
        });
};
