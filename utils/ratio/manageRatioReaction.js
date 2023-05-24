module.exports = async function (client, reaction) {
    if (reaction.partial) await reaction.fetch();

    let data = await client.ratioDB.get(reaction.message.id);

    if (!data) return;

    data.likes = reaction.count;

    await client.ratioDB.set(reaction.message.id, data);
};
