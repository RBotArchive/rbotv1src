const { AuditLogEvent } = require('discord.js');

module.exports = {
    name: "guildMemberDelete",
    async execute(client, member) {
        user = member.user;
        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberKick,
        });
        const kickLog = fetchedLogs.entries.first();
        if (!kickLog) {
            sendLog(client, "Membre parti", `${user.tag} a quitté le serveur.`)
        }
    },
};
