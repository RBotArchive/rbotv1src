const { SlashCommandBuilder } = require("discord.js");
const createPromptPanel = require("../../utils/general/createPromptPanel");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sendcaptchapanel")
        .setDescription("Envoie le panel de captcha (ADMIN)."),
    async execute(client, interaction) {
        const usender = interaction.user;
        const msender = interaction.member;
        const user = interaction.options.getUser("utilisateur");
        const member = interaction.options.getMember("utilisateur");
        createPromptPanel(
            client,
            interaction,
            "Bienvenue",
            "Bonjour ! Je suis RBot, votre guide dans ce serveur. Ce serveur est sécurisé avec un système de vérification anti-robot, donc avant d'y accéder, veuillez appuyer sur le bouton ci-dessous pour lancer la vérification. Vous aurez 60 secondes pour l'effectuer ainsi que 3 essais.",
            "Commencer",
            "startcaptcha"
        );
        return interaction.reply({
            content: "Panel envoyé avec succès !",
            ephemeral: true,
        });
    },
};
