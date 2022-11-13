const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(client, interaction) {
        const usender = interaction.user;
        const msender = interaction.member;
        const user = interaction.options.getUser("utilisateur");
        const member = interaction.options.getMember("utilisateur");
        client.logger.info(user.tag + " did a ping test.");
        firstMsg = await client.channels.cache
            .get("1038028006339395602")
            .send("[RBOT] Ping test...");
        ping = firstMsg.createdTimestamp - interaction.createdTimestamp;
        replyembed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Pong ! 🏓")
            .setDescription("Le ping actuel du bot est de " + ping + "ms.")
            .setAuthor({ name: "RBot", iconURL: client.user.avatarURL() })
            .setFooter({ text: "Demandé par " + usender.tag });
        return interaction.reply({ embeds: [replyembed] });
    },
};
