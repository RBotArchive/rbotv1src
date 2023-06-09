const { EmbedBuilder } = require("discord.js");

module.exports = function (
  client, title, message, asked = null
){
  let embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(title)
    .setDescription(message)
    .setAuthor({ name: "RBot", iconURL: client.user.avatarURL() })

  if (asked) {
    embed.setFooter({ text: "Demandé par " + asked.tag });
  }

  return embed
}