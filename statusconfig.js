const { ActivityType } = require("discord.js");

module.exports = {
    getStatuses(client) {
        return ["RASTIQNetwork",client.guilds.cache.get("1038028003822805065").memberCount + " joueurs",]
    }
}