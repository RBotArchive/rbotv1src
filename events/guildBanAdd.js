module.exports = {
    name: "guildBanAdd",
    async execute(client, ban) {
        if (ban.partial) ban = await ban.fetch();
        user = ban.user;
        sendLog(
            client,
            "Membre banni",
            `${user.tag} a été banni pour "${ban.reason}".`
        );
    },
};
