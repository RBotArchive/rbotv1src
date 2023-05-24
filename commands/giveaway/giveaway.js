const { SlashCommandBuilder } = require("discord.js");
const startGiveaway = require("../../utils/giveaways/startGiveaway");
const endGiveaway = require("../../utils/giveaways/endGiveaway");
const pauseGiveaway = require("../../utils/giveaways/pauseGiveaway");
const unpauseGiveaway = require("../../utils/giveaways/unpauseGiveaway");
const rerollGiveaway = require("../../utils/giveaways/rerollGiveaway");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("giveaway")
        .setDescription("Utilités de giveaway.")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("start")
                .setDescription("Commencer un giveaway.")
                .addStringOption((option) =>
                    option
                        .setName("durée")
                        .setDescription(
                            "La durée du giveaway. Exemple : 10s, 1h, 3d."
                        )
                        .setRequired(true)
                )
                .addIntegerOption((option) =>
                    option
                        .setName("gagnants")
                        .setDescription("Le nombre de gagnants du giveaway.")
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName("récompense")
                        .setDescription("La récompense du giveaway.")
                        .setRequired(true)
                )
                .addChannelOption((option) =>
                    option
                        .setName("salon")
                        .setDescription(
                            "Le salon dans lequel le giveaway va être effectué."
                        )
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("end")
                .setDescription("Terminer un giveaway.")
                .addStringOption((option) =>
                    option
                        .setName("giveaway")
                        .setDescription(
                            "Le giveaway à terminer (ID de message)."
                        )
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("pause")
                .setDescription("Mettre en pause un giveaway.")
                .addStringOption((option) =>
                    option
                        .setName("giveaway")
                        .setDescription(
                            "Le giveaway à mettre en pause (ID de message)."
                        )
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("unpause")
                .setDescription("Relancer un giveaway.")
                .addStringOption((option) =>
                    option
                        .setName("giveaway")
                        .setDescription(
                            "Le giveaway à relancer (ID de message)."
                        )
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("reroll")
                .setDescription("Touver un nouveau gagnant à un giveaway.")
                .addStringOption((option) =>
                    option
                        .setName("giveaway")
                        .setDescription("Le giveaway à reroll (ID de message).")
                        .setRequired(true)
                )
        ),
    async execute(client, interaction) {
        const usender = interaction.user;
        const msender = interaction.member;
        const user = interaction.options.getUser("utilisateur");
        const member = interaction.options.getMember("utilisateur");

        switch (interaction.options.getSubcommand()) {
          case "start":
            await startGiveaway(client, interaction);
            break;
          case "end":
            await endGiveaway(client, interaction);
            break;
          case "pause":
            await pauseGiveaway(client, interaction);
            break;
          case "unpause":
            await unpauseGiveaway(client, interaction);
            break;
          case "reroll":
            await rerollGiveaway(client, interaction);
            break;
        }
    },
};
