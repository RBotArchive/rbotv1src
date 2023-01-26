const sendSuggestionPanelMSG = require("./sendSuggestionPanelMSG");

module.exports = async function (client, interaction) {
    sendSuggestionPanelMSG(client, interaction.channel);
};
