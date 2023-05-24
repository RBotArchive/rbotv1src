const manageRatioReaction = require("../utils/ratio/manageRatioReaction.js");

module.exports = {
    name: "messageReactionAdd",
    async execute(client, reaction) {
        if (reaction.partial) await reaction.fetch();

        // Seeing if emoji is ratio emoji

        if (reaction.emoji.toString() === "❤") {

            // Checking if ratio exists
            
            let ratio = await client.ratioDB.get(reaction.message.id);

            if (ratio) manageRatioReaction(client, ratio)
        }
    },
};
