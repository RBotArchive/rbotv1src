module.exports = async function (client, message, level) {
    const roles = client.config.levelRoles
    for (i = 0; i < roles.length; i++) {
        if (roles[i].level === level) {
            message.member.roles.remove(roles[i - 1].id);
            message.member.roles.add(roles[i].id);
            return `\nTu es à présent ${
                client.guilds.cache
                    .get(client.config.guildId)
                    .roles.cache.get(roles[i].id).name
            } !`;
        }
    }
    return "";
};
