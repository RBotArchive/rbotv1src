const startCaptcha = require("../utils/startCaptcha");
const sendSuggestionModal = require("../utils/sendSuggestionModal");
const sendSuggestion = require("../utils/sendSuggestion");

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
        }
        if (interaction.isModalSubmit()) {
            if (interaction.customId === "suggestionModal") {
                interaction.reply({content: "Envoi de la suggestion...", ephemeral: true});
                const suggestion = interaction.fields.getTextInputValue('suggestion');
                sendSuggestion(client, interaction, suggestion)
            }
        }
    },
};
