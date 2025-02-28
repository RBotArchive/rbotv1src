const startCaptcha = require("../utils/captcha/startCaptcha");
const sendSuggestionModal = require("../utils/suggestions/sendSuggestionModal");
const sendSuggestion = require("../utils/suggestions/sendSuggestion");
const handleSuggestionVotes = require("../utils/suggestions/handleSuggestionVotes");

module.exports = {
    name: "interactionCreate",
    async execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(client, interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: "There was an error while executing this command!",
                    ephemeral: true,
                });
            }
        }
        if (interaction.isButton()) {
            if (interaction.customId === "startcaptcha") {
                startCaptcha(client, interaction);
            }
            if (interaction.customId === "makesuggestion") {
                sendSuggestionModal(client, interaction);
            }
            if (
                interaction.customId === "upvote" ||
                interaction.customId === "downvote"
            ) {
                await handleSuggestionVotes(client, interaction);
            }
        }
        if (interaction.isModalSubmit()) {
            if (interaction.customId === "suggestionModal") {
                interaction.reply({
                    content: "Envoi de la suggestion...",
                    ephemeral: true,
                });
                const suggestion =
                    interaction.fields.getTextInputValue("suggestion");
                await sendSuggestion(client, interaction, suggestion);
                interaction.editReply({
                    content: "Suggestion envoyée !",
                    ephemeral: true,
                });
            }
        }
    },
};
