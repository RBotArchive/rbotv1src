const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const canvacord = require("../utils/canvacord/index.js");
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Envoie une image du niveau de quelqu\'un sur le serveur.')
        .addUserOption(option => option.setName('utilisateur').setDescription('L\'utilisateur dont le niveau doit être montré')),
	async execute(client, interaction) {
		user = interaction.options.getUser('utilisateur');
		member = interaction.options.getMember('utilisateur');
        if (user === undefined || user === null) {
            user = interaction.user;
        }
        if (member === undefined || member === null) {
            member = interaction.member;
        }
        currentXp = await client.db.get(`${user.id}_currentXp`) | 0;
        currentLevel = await client.db.get(`${user.id}_currentLevel`) | 0;
        const rank = new canvacord.Rank()
            .setAvatar(user.avatarURL())
            .setCurrentXP(currentXp)
            .setRequiredXP((currentLevel + 1) * 10 - currentXp)
            .setStatus(member.presence.status)
            .setProgressBar("#FFFFFF", "COLOR")
            .setUsername(user.username)
            .setLevel(currentLevel, "NIVEAU")
            .setRank(1, "RANG ", false)
            .setDiscriminator(user.discriminator);

        rank.build()
            .then(async buffer => {
                await canvacord.write(buffer, `${user.id}_rank.png`);
                file = new AttachmentBuilder(`${user.id}_rank.png`)
                await interaction.reply({files: [file]});
                fs.unlink(`${user.id}_rank.png`, () => {})
            });
	},
};
