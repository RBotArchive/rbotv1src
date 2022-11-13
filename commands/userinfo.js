const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription(
      "Obtenir vos informations ou celles d'un autre utilisateur."
    )
    .addUserOption((option) =>
      option
        .setName("utilisateur")
        .setDescription(
          "L'utilisateur dont les informations doivent être montrées"
        )
    ),
  async execute(client, interaction) {
    const usender = interaction.user;
    const msender = interaction.member;
    const user = interaction.options.getUser("utilisateur");
    const member = interaction.options.getMember("utilisateur");
    let replyembed = null;
    if (user !== null) {
      let memberstatus = "Hors-ligne";
      switch (member.presence.status) {
        case "online":
          memberstatus = "En ligne";
          break;
        case "idle":
          memberstatus = "Inactif";
          break;
        case "dnd":
          memberstatus = "Ne pas déranger";
          break;
        case "offline":
          memberstatus = "Hors-ligne";
      }
      user.fetch({ force: true });
      replyembed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Informations à propos de " + user.tag)
        .addFields(
          { name: "Robot", value: user.bot === true ? "Oui" : "Non" },
          {
            name: "Compte créé le :",
            value: "<t:" + Math.floor(user.createdTimestamp / 1e3) + ":f>",
          },
          { name: "Status", value: memberstatus },
          { name: "Avatar", value: user.avatarURL() },
          { name: "Tag", value: user.discriminator },
          { name: "ID", value: user.id },
          {
            name: "A rejoint le :",
            value: "<t:" + Math.floor(member.joinedTimestamp / 1e3) + ":f>",
          }
        )
        .setImage(user.avatarURL())
        .setAuthor({ name: "RBot", iconURL: client.user.avatarURL() })
        .setFooter({ text: "Demandé par " + usender.tag });
    } else {
      let memberstatus = "Hors-ligne";
      switch (msender.presence.status) {
        case "online":
          memberstatus = "En ligne";
          break;
        case "idle":
          memberstatus = "Inactif";
          break;
        case "dnd":
          memberstatus = "Ne pas déranger";
          break;
        case "offline":
          memberstatus = "Hors-ligne";
      }
      usender.fetch({ force: true });
      replyembed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Informations à propos de " + usender.tag)
        .addFields(
          { name: "Robot", value: usender.bot === true ? "Oui" : "Non" },
          {
            name: "Compte créé le :",
            value: "<t:" + Math.floor(usender.createdTimestamp / 1e3) + ":f>",
          },
          { name: "Status", value: memberstatus },
          { name: "Avatar", value: usender.avatarURL() },
          { name: "Tag", value: usender.discriminator },
          { name: "ID", value: usender.id },
          {
            name: "A rejoint le :",
            value: "<t:" + Math.floor(msender.joinedTimestamp / 1e3) + ":f>",
          }
        )
        .setImage(usender.avatarURL())
        .setAuthor({ name: "RBot", iconURL: client.user.avatarURL() })
        .setFooter({ text: "Demandé par " + usender.tag });
    }
    return interaction.reply({ embeds: [replyembed] });
  },
};
