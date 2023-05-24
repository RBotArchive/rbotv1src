const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ratioleaderboard")
        .setDescription("Obtenir le leaderboard des ratios dans ce serveur."),
    async execute(client, interaction) {
        const usender = interaction.user;
        const msender = interaction.member;
        const user = interaction.options.getUser("utilisateur");
        const member = interaction.options.getMember("utilisateur");
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setFooter({
                        iconURL:
                            "https://cdn.discordapp.com/emojis/842457150110040144.gif",
                        text: "Charchement...",
                    })
                    .setColor("Yellow"),
            ],
        });

        const ratios = await client.ratioDB.all({ sort: "desc", limit: 10 });
        let desc = "";
        for (let i = 0; i < ratios.length; i++) {
            const related = await client.ratioDB.get(ratios[i].related);
            desc += `${numberEmojis[i]} ${ratios[i].username} :heart:**${ratios[i].likes}** ${md}≥${md} ${related.username} :heart:**${related.likes}**\n\n`;
        }

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Leaderboard des ratios`)
                    .setColor("Random")
                    .setDescription(
                        desc === ""
                            ? "Il n'y a pas de ratios dans ce serveur."
                            : desc
                    )
                    .setFooter({
                        text: `Code emprunté du Ratio Bot de jonah#1234.`,
                    }),
            ],
        });
    },
};
