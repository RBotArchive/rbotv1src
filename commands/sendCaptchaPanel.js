const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sendcaptchapanel')
		.setDescription('Envoie le panel de captcha (ADMIN).'),
	async execute(client, interaction) {
		const usender = interaction.user;
		const msender = interaction.member;
		const user = interaction.options.getUser('utilisateur');
		const member = interaction.options.getMember('utilisateur');
		row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('startcaptcha')
					.setLabel('Commencer')
					.setStyle(ButtonStyle.Success),
		);
		replyembed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle("Bienvenue")
				.setDescription("Bonjour ! Je suis RBot, votre guide dans ce serveur. Ce serveur est sécurisé avec un système de vérification anti-robot, donc avant d'y accéder, veuillez appuyer sur le bouton ci-dessous pour lancer la vérification. Vous aurez 60 secondes pour l'effectuer ainsi que 3 essais.")
				.setAuthor({name: "RBot", iconURL: client.user.avatarURL()})
		interaction.channel.send({embeds: [replyembed], components: [row]})
		return interaction.reply({content: "Panel envoyé avec succès !", ephemeral: true})
	},
};
