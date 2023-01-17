const ms = require("ms");
const sendLog = require("../utils/sendLog.js");

module.exports = async function (client, interaction) {
    const giveawayChannel = interaction.options.getChannel("salon");
    const giveawayDuration = interaction.options.getString("durée");
    const giveawayWinnerCount = interaction.options.getInteger("gagnants");
    const giveawayPrize = interaction.options.getString("récompense");

    if (!giveawayChannel.isTextBased()) {
        return interaction.reply({
            content: ":x: Le salon n'est pas un salon de texte.",
            ephemeral: true,
        });
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        duration: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayWinnerCount,
        // Who hosts this giveaway
        hostedBy: true ? interaction.user : null,
    });

    interaction.reply({
        content: `Giveaway lancé dans ${giveawayChannel} !`,
        ephemeral: true,
    });

    sendLog(
        client,
        "Giveaway lancé",
        `Giveaway lancé dans ${giveawayChannel} par ${interaction.user.username}.`
    );
    return;
};
