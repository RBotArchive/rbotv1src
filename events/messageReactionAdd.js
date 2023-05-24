const manageReaction = require("../utils/ratio/manageRatioReaction.js");

module.exports = {
    name: "messageReactionAdd",
    async execute(client, reaction) {
        manageReaction(client, reaction);
    },
};
