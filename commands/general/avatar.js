const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Obtenir votre avatar ou celui d'un autre utilisateur.")
        .addUserOption((option) =>
            option
                .setName("utilisateur")
                .setDescription("L'utilisateur dont l'avatar doit être montré.")
        ),
    async execute(client, interaction) {
        const usender = interaction.user;
        const msender = interaction.member;
        const user = interaction.options.getUser("utilisateur");
        const member = interaction.options.getMember("utilisateur");
        let replyembed = null;
        if (user !== null) {
            replyembed = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle("Avatar de " + user.tag)
                .setImage(user.avatarURL())
                .setAuthor({ name: "RBot", iconURL: client.user.avatarURL() })
                .setFooter({ text: "Demandé par " + usender.tag });
        } else {
            replyembed = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle("Avatar de " + usender.tag)
                .setImage(usender.avatarURL())
                .setAuthor({ name: "RBot", iconURL: client.user.avatarURL() })
                .setFooter({ text: "Demandé par " + usender.tag });
        }
        return interaction.reply({ embeds: [replyembed] });
    },
};
