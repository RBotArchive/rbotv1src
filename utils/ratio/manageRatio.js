module.exports = async function (client, message) {
    await message.react("❤");
    let msg = null;
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

    let check = await client.ratioDB.get(msg.id);

    let data = {
        id: message.id,
        userId: message.author.id,
        serverId: message.guild.id,
        username: message.author.username,
        // expire: Date.now() + 2592000000,
        related: msg.id,
    };

    if (!check) {
        await msg.react("❤");
        let msgdata = {
            id: msg.id,
            userId: msg.author.id,
            serverId: msg.guild.id,
            username: msg.author.username,
            // expire: Date.now() + 2592000000,
            related: message.id,
        };
        await client.ratioDB.set(msg.id, msgdata);
    }

    await client.ratioDB.set(message.id, data);
};
