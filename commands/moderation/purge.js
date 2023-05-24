const { SlashCommandBuilder } = require("discord.js");
const sendLog = require("../../utils/general/sendLog.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Supprime des messages. (ADMIN)")
        .addIntegerOption((option) =>
            option
                .setName("nb")
                .setDescription("Le nombre de messages à supprimer.")
                .setRequired(true)
        ),
    async execute(client, interaction) {
        const usender = interaction.user;
        const msender = interaction.member;
        const nb = interaction.options.getInteger("nb");
        if (nb % 1 != 0) {
            return interaction.reply({
                content: "Vous devez entrer un nombre entier !",
                ephemeral: true,
            });
        }
        if (nb < 1 || nb > 99) {
            return interaction.reply({
                content: "Vous devez entrer un nombre entre 1 et 99 !",
                ephemeral: true,
            });
        }
        try {
            await interaction.channel.bulkDelete(nb);
        } catch (e) {
            return interaction.reply({
                content:
                    ":x: Une erreur s'est produite pendant la suppression des messages !",
                ephemeral: true,
            });
        }

        sendLog(
            client,
            "Messages supprimés",
            `${nb} messages ont été supprimés par ${usender.tag}`
        );

        return interaction.reply({
            content: `Vous avez supprimé avec succès ${nb} messages !`,
            ephemeral: true,
        });
    },
};
