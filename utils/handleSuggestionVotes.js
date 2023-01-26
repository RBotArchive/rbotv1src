const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async function (client, interaction) {
    const user = interaction.member.id;
    const suggestion = await client.suggestionDB.get(
        `suggestion_${interaction.message.id}`
    );
    const author = suggestion.author;
    if (author === interaction.member.id) {
        return interaction.reply({
            content: "Vous ne pouvez pas voter à votre propre suggestion !",
            ephemeral: true,
        });
    }
    let votes = suggestion.votes;
    votes = new Map(Object.entries(votes));
    let voteVal;
    if (interaction.customId === "upvote") voteVal = 1;
    else voteVal = -1;

    if (votes.has(user)) {
        if (votes.get(user) !== voteVal) {
            votes.set(user, voteVal);
        } else {
            votes.delete(user);
        }
    } else {
        votes.set(user, voteVal);
    }
    await client.suggestionDB.set(`suggestion_${interaction.message.id}`, {
        author: author,
        votes: votes,
    });
    const voteTotal = Array.from(votes.values()).reduce((a, b) => a + b, 0);

    const embed = interaction.message.embeds[0];
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setLabel("Upvote")
            .setEmoji(":up:1066683099305484338")
            .setCustomId("upvote"),
        new ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setLabel(voteTotal.toString())
            .setDisabled(true)
            .setCustomId("votenumbers"),
        new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setLabel("Downvote")
            .setEmoji(":down:1066683097304797184")
            .setCustomId("downvote")
    );
    await interaction.message.edit({ embeds: [embed], components: [row] });
    await interaction.deferUpdate();
};
