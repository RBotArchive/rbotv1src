const createPromptPanel = require("./createPromptPanel");

module.exports = async function (client, interaction) {
    createPromptPanel(client, interaction, "Suggestion", "Bienvenue dans le salon de suggestions. Vous pouvez voir les suggestions au dessus de ce message. Pour en créer une, cliquez sur le bouton ci-dessous.", "Créer une suggestion", "makesuggestion", true);
};
