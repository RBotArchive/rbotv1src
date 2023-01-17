module.exports = async function (client, interaction) {
    const modal = new ModalBuilder()
        .setCustomId("suggestionModal")
        .setTitle("Créer une suggestion");

    // Add components to modal

    // Create the text input components
    const suggestion = new TextInputBuilder()
        .setCustomId("suggestion")
        // The label is the prompt the user sees for this input
        .setLabel("Votre suggestion")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short);

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(suggestion);

    // Add inputs to the modal
    modal.addComponents(firstActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);
};
