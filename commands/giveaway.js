const { SlashCommandBuilder } = require("discord.js");
const startGiveaway = require("../utils/startGiveaway");
const endGiveaway = require("../utils/endGiveaway");
const pauseGiveaway = require("../utils/pauseGiveaway");
const unpauseGiveaway = require("../utils/unpauseGiveaway");
const rerollGiveaway = require("../utils/rerollGiveaway");
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
        if (interaction.options.getSubcommand() === "start") {
            await startGiveaway(client, interaction);
        }
        if (interaction.options.getSubcommand() === "end") {
            await endGiveaway(client, interaction);
        }
        if (interaction.options.getSubcommand() === "pause") {
            await pauseGiveaway(client, interaction);
        }
        if (interaction.options.getSubcommand() === "unpause") {
            await unpauseGiveaway(client, interaction);
        }
        if (interaction.options.getSubcommand() === "reroll") {
            await rerollGiveaway(client, interaction);
        }
    },
};
