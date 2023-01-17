const { SlashCommandBuilder } = require("discord.js");
const sendSuggestionPanel = require("../utils/sendSuggestionPanel");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sendsuggestionpanel")
        .setDescription("Envoie le panel de suggestion (ADMIN)."),
    async execute(client, interaction) {
        const usender = interaction.user;
        const msender = interaction.member;
        const user = interaction.options.getUser("utilisateur");
        const member = interaction.options.getMember("utilisateur");
        sendSuggestionPanel(client, interaction);
        return interaction.reply({
            content: "Panel envoyé avec succès !",
            ephemeral: true,
        });
    },
};
