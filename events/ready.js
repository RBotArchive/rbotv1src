const { ActivityType } = require("discord.js");

module.exports = {
    name: "ready",
    async execute(client) {
        client.logger.info("Ready!");
        statuses = [
            "RASTIQNetwork",
            client.guilds.cache.get("1038028003822805065").memberCount +
                " joueurs",
        ];
        statustypes = [ActivityType.Playing, ActivityType.Watching];
        statuscount = 0;
        client.user.presence.set({
            status: "dnd",
            activities: [
                { name: statuses[statuscount], type: statustypes[statuscount] },
            ],
        });
        setInterval(function () {
            statuscount = statuscount + 1;
            if (statuscount === 2) {
                statuscount = 0;
            }
            client.user.presence.set({
                status: "dnd",
                activities: [
                    {
                        name: statuses[statuscount],
                        type: statustypes[statuscount],
                    },
                ],
            });
        }, 10000);
    },
};
