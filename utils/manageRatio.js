module.exports = async function (client, message) {
    await message.react("<:RED:868566740718719017>");
    if (message.reference)
        msg = await message.channel.messages.fetch(message.reference.messageId);
    if (!msg) {
        const msgs = Array.from(
            (await message.channel.messages.fetch()).values()
        );

        for (const m of msgs)
            if (
                (message.mentions.users.size &&
                    message.mentions.users.first().id === m.author.id) ||
                (!message.mentions.users.size &&
                    m.author.id !== message.author.id)
            ) {
                msg = m;
                break;
            }
    }
};
