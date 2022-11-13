const startCaptcha = require("../utils/startCaptcha");

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
        }
    },
};
