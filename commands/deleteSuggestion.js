const { SlashCommandBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("deletesuggestion")
        .setDescription("Supprime une suggestion. (ADMIN)")
        .addStringOption((option) =>
            option
                .setName("suggestion")
                .setDescription("L'ID de la suggestion à supprimer.")
                .setRequired(true)
        ),
    async execute(client, interaction) {
        const usender = interaction.user;
        const messageID = interaction.options.getString("suggestion");
        const suggestion = await client.suggestionDB.get(
            `suggestion_${messageID}`
        );
        if (suggestion === null || suggestion === undefined) {
            return interaction.reply({
                content: ":x: Cette suggestion n'a pas été trouvée.",
                ephemeral: true,
            });
        }

        await client.channels.cache
            .get(client.config.suggestionsChannel)
            .messages.cache.get(messageID)
            .delete();

        await client.suggestionDB.delete(`suggestion_${messageID}`);

        sendLog(
            client,
            "Suggestion supprimée",
            `La suggestion ${messageID} créée par ${
                client.users.cache.get(suggestion.author).tag
            } a été suprimée par ${usender.tag}`
        );

        return interaction.reply({
            content: `Vous avez supprimé avec succès la suggestion ${messageID} créée par ${
                client.users.cache.get(suggestion.author).tag
            } !`,
            ephemeral: true,
        });
    },
};
