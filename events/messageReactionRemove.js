const manageReaction = require("../utils/ratio/manageRatioReaction.js");

module.exports = {
    name: "messageReactionRemove",
    async execute(client, reaction) {
        manageReaction(client, reaction);
    },
};
