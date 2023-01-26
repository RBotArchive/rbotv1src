const { AttachmentBuilder } = require("discord.js");
const canvacord = require("../utils/canvacord/index.js");
const fs = require("node:fs");
const path = require("node:path");
const sendLog = require("../utils/sendLog.js");

module.exports = {
    name: "guildMemberAdd",
    async execute(client, member) {
        user = member.user;
        const welcome = new canvacord.Welcomer()
            .setAvatar(user.avatarURL())
            .setGuildName(member.guild.name)
            .setMemberCount(member.guild.memberCount)
            .setUsername(user.username)
            .setDiscriminator(user.discriminator);
        welcome.build().then(async (buffer) => {
            await canvacord.write(buffer, `${user.id}_welcome.png`);
            file = new AttachmentBuilder(`${user.id}_welcome.png`);
            await client.channels.cache
                .get("1038028005315985468")
                .send({ files: [file] });
            fs.unlink(`${user.id}_welcome.png`, () => {});
            sendLog(
                client,
                "Nouveau membre",
                `${user.tag} a rejoint le serveur.`
            );
        });
    },
};
