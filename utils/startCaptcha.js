const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const Captcha = require("@haileybot/captcha-generator");
const fs = require("node:fs");
const path = require("node:path");

module.exports = async function (client, interaction) {
    client.logger.info(interaction.user.tag + " started CAPTCHA.");
    let captcha = new Captcha();
    await captcha.JPEGStream.pipe(
        await fs.createWriteStream(`${interaction.user.id}.jpg`)
    );
    const file = new AttachmentBuilder(`${interaction.user.id}.jpg`);
    replyembed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("CAPTCHA")
        .setDescription(
            "Le système de vérification est simple. Vous devez simplement écrire les lettres et chiffres contenus dans l'image ci-dessous pour obtenir accès au serveur."
        )
        .setAuthor({ name: "RBot", iconURL: client.user.avatarURL() });
    await interaction.reply({
        embeds: [replyembed],
        files: [file],
        ephemeral: true,
    });
    fs.unlink(`${interaction.user.id}.jpg`, () => {});
    const filter = (m) => m.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({
        filter,
        time: 60000,
    });
    tries = 3;
    verified = false;
    collector.on("collect", (m) => {
        m.delete();
        if (m.content.toUpperCase() === captcha.value) {
            verified = true;
            collector.stop();
        } else {
            tries = tries - 1;
            if (tries === 0) {
                collector.stop();
            } else {
                interaction.followUp({
                    content: `:x: Raté ! Il vous reste ${tries} essais`,
                    ephemeral: true,
                });
            }
        }
    });
    collector.on("end", async (collected) => {
        if (verified === true) {
            client.logger.info(`${interaction.user.tag} completed CAPTCHA`);
            interaction.followUp({
                content: `:white_check_mark: Bienvenue sur le serveur !`,
                ephemeral: true,
            });
            interaction.member.roles.add("1038028003982196744");
            interaction.member.roles.add("1038028003982196737");
            interaction.member.roles.add("1038028003982196736");
            interaction.member.roles.add("1038028003822805066");
        } else {
            client.logger.info(`${interaction.user.tag} failed CAPTCHA`);
            await interaction.member.createDM();
            interaction.member.dmChannel.send({
                content:
                    ":x: Vous avez été expulsé du serveur car vous avez raté vos 3 essais de CAPTCHA.",
                ephemeral: true,
            });
            interaction.member.kick("CAPTCHA raté");
        }
    });
};
