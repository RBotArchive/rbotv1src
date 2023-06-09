const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const generateEmbed = require("../../utils/general/generateEmbed");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(client, interaction) {
        const usender = interaction.user;
        const msender = interaction.member;
        const user = interaction.options.getUser("utilisateur");
        const member = interaction.options.getMember("utilisateur");
        client.logger.info(usender.tag + " did a ping test.");
        firstMsg = await client.channels.cache
            .get(client.config.logsChannel)
            .send("[RBOT] Ping test...");
        ping = firstMsg.createdTimestamp - interaction.createdTimestamp;
        replyembed = generateEmbed(client, "Pong ! 🏓", "Le ping actuel du bot est de " + ping + "ms.", usender)
        return interaction.reply({ embeds: [replyembed] });
    },
};
