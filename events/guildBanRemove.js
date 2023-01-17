module.exports = {
    name: "guildBanRemove",
    async execute(client, ban) {
        user = ban.user;
        sendLog(client, "Membre débanni", `${user.tag} a été débanni. Raison du ban original : "${ban.reason}".`)
    },
};
